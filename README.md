# wanted-pre-onboarding-backend
## 요구사항

### 구현할 기능

- [x] **채용공고 등록 기능**
  - 회사는 채용공고를 등록할 수 있다.

- [x] **채용공고 수정 기능**
  - 회사는 채용공고를 수정할 수 있다.

- [x] **채용공고 삭제 기능**
  - 채용공고는 DB에서 삭제될 수 있다.

- [x] **채용공고 목록 조회 기능**
  - 사용자는 채용공고 목록을 확인할 수 있다.
  - [x] 채용공고 검색 기능(선택사항 및 가산점 요소 포함).

- [x] **채용 상세 페이지 조회 기능**
  - 사용자는 채용 상세 페이지를 확인할 수 있다.
  - [x] 해당 회사가 올린 다른 채용공고 포함(선택사항 및 가산점 요소 포함).

- [x] **채용공고 지원 기능(선택사항 및 가산점요소)**
  - 사용자는 채용공고에 지원할 수 있다.
  - 사용자는 1회만 지원 가능하다.

### 필수 기술요건
- [x] ORM 사용하여 구현.(Sequelize 사용)
- [x] RDBMS 사용.(MySQL 사용)

## 구현 과정
### ERD

![ERD Image](ERD.png)

#### 1. TB_Position의 PartId와 ExperienceLevelId의 관계 설정

`TB_Position` 테이블에서 `PartId`와 `ExperienceLevelId`를 외래 키로 설정하였습니다. 이를 참조하기 위해 `TB_Part` 테이블과 `TB_ExperienceLevel` 테이블을 각각 생성하였습니다. `TB_Part`에는 `FE`, `BE`, `AI`, `etc` 와 같은 4개의 레코드를 넣었으며, `TB_ExperienceLevel`에도 `rookie`, `junior`, `senior` 와 같은 3개의 레코드를 넣었습니다.

#### 이유:
- `Part`와 `ExperienceLevel`은 각각 도메인이 명확히 정해져 있습니다.
- 이러한 방식을 통해 유지 보수를 용이하게 하고, 잘못된 입력이나 오타를 사전에 방지할 수 있습니다.

### API 명세서

[API Documentation](https://documenter.getpostman.com/view/25690003/2s9YR3dbDy)
