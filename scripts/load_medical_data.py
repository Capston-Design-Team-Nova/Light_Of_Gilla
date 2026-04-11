#!/usr/bin/env python3
"""Load hospital/pharmacy CSV files into MySQL hospital table."""

from __future__ import annotations

import argparse
import csv
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, Optional


@dataclass
class MedicalRow:
    district: str
    name: str
    score: Optional[float]
    address: str
    img_url: str
    reviews: str
    open_hour: str


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Import hospital/pharmacy CSV data into MySQL table."
    )
    parser.add_argument("--root-dir", type=Path, default=Path.cwd(), help="Project root path")
    parser.add_argument(
        "--hospital-dir",
        type=Path,
        default=Path("병원 데이터"),
        help="Hospital CSV directory (relative to root-dir if not absolute)",
    )
    parser.add_argument(
        "--pharmacy-dir",
        type=Path,
        default=Path("약국 데이터"),
        help="Pharmacy CSV directory (relative to root-dir if not absolute)",
    )
    parser.add_argument("--db-host", default="3.37.146.121")
    parser.add_argument("--db-port", type=int, default=3306)
    parser.add_argument("--db-name", default="hospital_data")
    parser.add_argument("--db-user", default="user")
    parser.add_argument("--db-password", default="user")
    parser.add_argument("--table", default="hospital")
    parser.add_argument("--batch-size", type=int, default=500)
    parser.add_argument("--dry-run", action="store_true", help="Parse only, no DB write")
    return parser.parse_args()


def resolve_dir(root: Path, candidate: Path) -> Path:
    return candidate if candidate.is_absolute() else (root / candidate)


def parse_score(raw: str) -> Optional[float]:
    value = (raw or "").strip()
    if not value:
        return None
    try:
        return float(value)
    except ValueError:
        return None


def normalize_row(district: str, row: dict[str, str]) -> MedicalRow:
    return MedicalRow(
        district=district,
        name=(row.get("name") or "").strip(),
        score=parse_score(row.get("score", "")),
        address=(row.get("address") or "").strip(),
        img_url=(row.get("img_url") or "").strip(),
        reviews=(row.get("reviews") or "").strip(),
        open_hour=(row.get("open_hour") or "").strip(),
    )


def district_from_hospital_file(path: Path) -> str:
    return path.parent.name.strip()


def district_from_pharmacy_file(path: Path) -> str:
    parent = path.parent.name.strip()
    return parent[:-3] if parent.endswith("_약국") else parent


def iter_csv_rows(base_dir: Path, district_resolver) -> Iterable[MedicalRow]:
    for csv_path in sorted(base_dir.rglob("*.csv")):
        district = district_resolver(csv_path)
        with csv_path.open("r", encoding="utf-8-sig", newline="") as f:
            reader = csv.DictReader(f)
            for raw in reader:
                record = normalize_row(district, raw)
                if record.name and record.address:
                    yield record


def connect_mysql(args: argparse.Namespace):
    import pymysql

    return pymysql.connect(
        host=args.db_host,
        port=args.db_port,
        user=args.db_user,
        password=args.db_password,
        database=args.db_name,
        charset="utf8mb4",
        autocommit=False,
    )


def upsert_rows(rows: list[MedicalRow], args: argparse.Namespace) -> tuple[int, int]:
    inserted = 0
    updated = 0
    connection = connect_mysql(args)
    try:
        with connection.cursor() as cursor:
            for row in rows:
                cursor.execute(
                    f"SELECT id FROM {args.table} WHERE district=%s AND name=%s AND address=%s LIMIT 1",
                    (row.district, row.name, row.address),
                )
                found = cursor.fetchone()
                if found:
                    cursor.execute(
                        f"""
                        UPDATE {args.table}
                        SET score=%s, img_url=%s, reviews=%s, open_hour=%s
                        WHERE id=%s
                        """,
                        (row.score, row.img_url, row.reviews, row.open_hour, found[0]),
                    )
                    updated += 1
                else:
                    cursor.execute(
                        f"""
                        INSERT INTO {args.table}
                        (district, name, score, address, img_url, reviews, open_hour)
                        VALUES (%s, %s, %s, %s, %s, %s, %s)
                        """,
                        (
                            row.district,
                            row.name,
                            row.score,
                            row.address,
                            row.img_url,
                            row.reviews,
                            row.open_hour,
                        ),
                    )
                    inserted += 1
        connection.commit()
        return inserted, updated
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()


def chunked(iterable: Iterable[MedicalRow], size: int) -> Iterable[list[MedicalRow]]:
    bucket: list[MedicalRow] = []
    for item in iterable:
        bucket.append(item)
        if len(bucket) >= size:
            yield bucket
            bucket = []
    if bucket:
        yield bucket


def main() -> None:
    args = parse_args()
    root = args.root_dir.resolve()
    hospital_dir = resolve_dir(root, args.hospital_dir)
    pharmacy_dir = resolve_dir(root, args.pharmacy_dir)

    if not hospital_dir.exists() or not pharmacy_dir.exists():
        raise FileNotFoundError(
            f"Input directories not found: hospital={hospital_dir}, pharmacy={pharmacy_dir}"
        )

    rows = list(iter_csv_rows(hospital_dir, district_from_hospital_file))
    rows.extend(iter_csv_rows(pharmacy_dir, district_from_pharmacy_file))

    print(f"Parsed rows: {len(rows)}")
    if args.dry_run:
        print("Dry-run mode: no DB write")
        return

    inserted_total = 0
    updated_total = 0
    for batch in chunked(rows, args.batch_size):
        inserted, updated = upsert_rows(batch, args)
        inserted_total += inserted
        updated_total += updated
        print(f"Batch done: inserted={inserted_total}, updated={updated_total}")

    print(f"Completed: inserted={inserted_total}, updated={updated_total}")


if __name__ == "__main__":
    main()

