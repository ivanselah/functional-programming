#### 절차적

- 명령문의 연속성과 실행 순서의 초점을 두며, 코드가 단계적이고 상태변경을 중심으로 작성

#### 선언적

- 원하는 결과에 중점을 두고, 어떻게 그 결과를 얻을지는 신경 쓰지 않으며, 추상화와 높은 수준의 표현으로 작성

추상화 : 복잡한 자료, 모듈, 시스템 등으로부터 핵심적인 개념 또는 기능을 간추려 내는 것

#### 함수형 프로그래밍 ⭐️

---

상태 변경과 가변 데이터보다는 불변성과 순수 함수를 강조하는 패러다임

- 순수함수 : 오직 입력에만 의존하고, 외부 변수에 의존하지 않고, 외부 상태를 변경하지 않으며 side effect가 없고 동일한 입력에 대해 항상 동일한 결과를 반환
- 불변성 : 원본 데이터를 변경하는 대신 새로운 데이터를 생성하거나 반환 (불변성을 유지하면 예측 가능성을 높일 수 있음)
- 함수조합 : 작은 함수들을 조합하여 더 복잡한 동작을 수행하는 함수를 만들고 이를 통해 재사용과 추상화 극대화
- 데이터변환 : 데이터를 변환하거나 조작하기 위해 map, filter, reduce 등 내장 함수 또는 커스텀 함수 사용

> 함수형 프로그래밍은 병렬처리, 상태관리의 용이성, 코드의 안정성과 테스트 용이성의 장점을 가지고 있음

> 함수들 간의 종속성이 적어지고 모듈화와 재사용성이 강화되어 코드 유지보수 측면에서 이점이 있음

---

> #### 06 20 - day1

#### 평가

- 코드가 계산되어 값을 만드는 것

#### 일급

- 값으로 다룰 수 있다.
- 변수에 담을 수 있다.
- 함수의 인자로 사용될 수 있다.
- 함수의 결과로 사용될 수 있다.

#### 일급함수

- 함수가 값으로 다룰 수 있다.

#### 고차함수

- 함수를 값으로 다루는 함수

1. 함수를 인자로 받아서 실행하는 함수
2. 함수를 만들어 리턴하는 함수 (클로저를 만들어 리턴하는 함수)

> #### 06 21 - day2

#### 제너레이터

- 이터레이터이자 이터러블을 생성하는 함수

> #### 06 22 - day3

#### map, filter, reduce

- 이터러블 프로토콜을 따르는 커스텀 함수 생성

> #### 06 23 - day4

- 코드를 값으로 다루어 표현력 높이기
