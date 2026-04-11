# Medical CSV Loader

병원/약국 CSV(`병원 데이터`, `약국 데이터`)를 MySQL `hospital` 테이블로 적재하는 스크립트입니다.

## 1) 설치

```powershell
Set-Location "C:\Users\vmffo\Desktop\포트폴리오용\Light_Of_Gilla-hsyoo_backend2"
python -m pip install -r .\scripts\requirements.txt
```

## 2) 드라이런(파싱만 확인)

```powershell
python .\scripts\load_medical_data.py --dry-run
```

## 3) 실제 적재

```powershell
python .\scripts\load_medical_data.py --db-host 3.37.146.121 --db-port 3306 --db-name hospital_data --db-user user --db-password user
```

## 옵션

- `--root-dir`: 프로젝트 루트 (기본: 현재 작업 폴더)
- `--hospital-dir`: 병원 CSV 폴더 (기본: `병원 데이터`)
- `--pharmacy-dir`: 약국 CSV 폴더 (기본: `약국 데이터`)
- `--table`: 대상 테이블 (기본: `hospital`)
- `--batch-size`: 배치 크기 (기본: `500`)
- `--dry-run`: DB 미기록

## 참고

- 중복 기준은 `district + name + address` 입니다.
- 중복 레코드가 있으면 `score`, `img_url`, `reviews`, `open_hour`를 업데이트합니다.

