# 23.03.06.
```
- erd 회의 및 설계
- 기능명세서 회의
- 깃 컨벤션 작성
```

# 23.03.08.
```
- erd 설계
```

# 23.03.09.
```
- erd 수정
- api 작성
```

# 23.03.10.
```
- erd 수정
- api 작성
```

# 23.03.13.
```
1. nginx 설정과 ssl 적용하기 ( △ )
2. server에 mysql 올리기 -> 포트번호 3876
	### DB 보안 필수!!!!!!!!! ###
	0. 도커로 설치 할 것 ( 0 )
		1. docker pull mysql
		2. sudo docker run -d -p 3876:3306 -e MYSQL_ROOTPASSWORD=tamla204@ --restart=unless-stopped -v /home/ubuntu/db:/var/lib/mysql --name mysql mysql
		3. Docker 일반 사용자에게 권한 부여하는 방법
	1. 기본 3306 포트 변경 -> 3876 ( 0 )
	2. root 계정명 변경	-> root -> tamla ( 0 ) 
			-> root 비밀번호 1234 ( 0 )
			-> 유저 tamlain 비밀번호 tamla204@ ( 0 )
3. 백 db 접속해보기 ( 0 ) 
4. 젠킨스 파이프라인 구축 (x)
5. 무중단 배포 진행(x)
6. entity 설계 (o)
```

# 23.03.14.
```
1. 서버 배포 ssl 적용 완료
2. 젠킨스 설정 ( △ )
	실패 
		1. Warning: CredentialId "gitlab-jenkins" could not be found.
		2. docker file이 없어서 ?
3. 카카오 로그인 하는 중..
```

# 23.03.15.
```
- 카카오 로그인 하는 중..
- 중간 발표 ppt
```

# 23.03.16.
```
- 중간 발표 ppt
- erd 작성
```

# 23.03.17.
```
- 중간 발표
```

# 23.03.20.
```
- 카카오 로그인 작성
- CI/CD 진행중
```

# 23.03.21.
```
- 카카오 로그인 : refresh token redis 저장해야함
```

# 23.03.22.
```
- 카카오 로그인 : refresh token redis 저장해야함
- 배포는 했는데 .env랑 .yml 파일 젠킨스에서 설정을 할 것 같습니다만 안되면 서버에 올릴 듯 합니다.
```

# 23.03.23.
```
- 카카오 로그인
	- 암호화 jaspty
	- 로그아웃, refresh token redis에 저장 -> 확인해야합니다.
- 배포 완료 webhook 설정 해주었으나 study에 push해도 다시 올라감..
```

# 23.03.24.
```
- 로그인 완료 ( redis 저장 확인 )
- 배포 완료
```
