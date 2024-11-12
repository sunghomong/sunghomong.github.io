---
title: (javascript/JAVA) 페이징 처리 예제  
date: 2024-11-11 12:00:00 +0800
categories: [ library,javascript ]
tags: [ library,java,페이징,javascript,html ]
toc: true
math: true
mermaid: true
---

<style>
  .center-text{
  text-align: center;
  }
</style>

![img1](/assets/img/post_images/library-javascript-img1.jpg)

<p class="center-text">안녕하세요.</p> 
<br>
<p class="center-text">이번 글은 위 화면 처럼 페이징 처리하는 화면을 다뤄볼 생각입니다.</p>
<br>

## 용어 정의

- nowPageNo : 현재 페이지 번호
- prePageNo : 이전 페이지 번호
- nextPageNo : 다음 페이지 번호
- pageClick() : 해당 페이지 번호 클릭 시 호출될 함수
- totalPageCount : 전체 페이지 개수
- totalCount : 전체 row 개수
- listSize : 페이지 당 row 개수
- rowStart : 해당 페이지 시작 인덱스 번호
- rowLimit : 해당 페이지 끝 인덱스 번호

## 관계식 정의

### `nowPageNo`

현재 페이지 번호로서 해당 페이지 번호를 나타낸다. <br>
즉 이 번호가 기준 점이 되는 것 이다.
<br>

### `prePageNo`

이전 페이지 번호로 nowPageNo 를 기준으로 -1 한 값이 된다.<br>
즉 이전 버튼 클릭시 pageClick(nowPageNo - 1) 의 값이 될 것이고,<br>
nowPageNo 가 1 일 시 해당 페이지에 머무는 동작을 할 것이다.
<br>

### `nextPageNo`

다음 페이지 번호로 nowPageNo 를 기준으로 +1 한 값이 된다.<br>
다음 버튼 클릭시 pageClick(nowPageNo + 1) 의 값이 될 것이고,<br>
nowPageNo 가 totalPageCount 개수와 동일 할 경우에는 해당 페이지에 머물게 될 것이다.
<br>

### `function pageClick() `

해당 함수는 예를 들어 1~8 카운트 까지의 페이지 번호가 있을 때,<br>
7 페이지를 눌렀을때 pageClick(7) 을 호출 하게 된다.<br>
즉, 이 함수는 해당 페이지에 속하는 row 정보 list 를 추출한다.
<br>

### `totalPageCount`

데이터 list 를 request 값 listSize 의 size 에 따라 나눠진 총 페이지 개수,<br>
예를 들어 210개의 데이터가 있을 때 listSize 제한을 20으로 둔다면,<br>
해당 totalPageCount = (210 / listSize) + 1 로 한다면 21페이지가 나온다.
<br>

### `totalCount`

데이터 list 의 총 개수이다.<br>
<br>

### `listSize`

기준이 되는 변수이다.<br>
20,50,100 개 사이즈로 기준을 잡았다.<br>
해당 사이즈를 통해 totalPageCount 를 구하고 그에 해당하는 동적 페이징 처리가 가능하다.<br>
<br>

### `rowStart`

데이터 추출 시 필요한 변수이다.<br>
예를 들어 현재 페이지가 4 페이지이고 listSize 가 50 으로 기준을 잡았을때,<br>
4 * 50 = 200, 200 인덱스 데이터 부터 추출을 할 수 있게 된다.<br>
<br>

### `rowLimit`

데이터 추출 시 필요한 변수로,<br>
반대로 200 인덱스부터 시작 했고 listSize 가 50 일때,<br>
200 + 50 = 250, 250 인덱스 까지 추출 하게 된다.<br>
<br>

## javascript, html

```javascript
/* 페이징 생성 */
function setPageNo(totalCount, totalPageCount) {

    let pagingHtml = '';
    pagingHtml += '<nav class="c-pagination">';
    pagingHtml += '<ul>';

    // 처음과 이전 링크 추가
    pagingHtml += '<li>';
    pagingHtml += '<a class="page-link" href="#" onclick="pageClick(1);" aria-label="처음">';
    pagingHtml += '<span class="is-blind p-first">처음</span>';
    pagingHtml += '</a></li>';

    // 이전 링크
    let prePageNo;

    if (pageNo === 1) {
        prePageNo = 1;
    } else {
        prePageNo = pageNo - 1;
    }

    pagingHtml += '<li>';
    pagingHtml += '<a class="page-link" href="#" onclick="pageClick(' + prePageNo + ');" aria-label="이전">';
    pagingHtml += '<span class="is-blind p-prev">이전</span>';
    pagingHtml += '</a></li>';

    const pageSize = 10;

    let startPage = Math.floor((pageNo - 1) / pageSize) * pageSize + 1;
    let endPage = startPage + pageSize - 1;

    if (endPage > totalPageCount) {
        endPage = totalPageCount;
    }

    // 페이지 번호 생성
    for (let i = startPage; i <= endPage; i++) {
        if (pageNo === i) {
            pagingHtml += '<li><a class="page-link is-active" href="#" onclick="pageClick(' + i + ');">' + i + '</a></li>';
        } else {
            pagingHtml += '<li><a class="page-link" href="#" onclick="pageClick(' + i + ');">' + i + '</a></li>';
        }
    }

    // 이전 링크
    let nextPageNo;

    if (pageNo === totalPageCount) {
        nextPageNo = pageNo;
    } else {
        nextPageNo = pageNo + 1;
    }

    // 다음과 끝 링크 추가
    pagingHtml += '<li>';
    pagingHtml += '<a class="page-link" href="#" onclick="pageClick(' + nextPageNo + ');" id="nextArrow" aria-label="다음">';
    pagingHtml += '<span class="is-blind p-next">다음</span>';
    pagingHtml += '</a></li>';

    pagingHtml += '<li>';
    pagingHtml += '<a class="page-link" href="#" onclick="pageClick(' + totalPageCount + ');" aria-label="끝">';
    pagingHtml += '<span class="is-blind p-end">끝</span>';
    pagingHtml += '</a></li>';

    pagingHtml += '</ul></nav>';

    $("#listPaging").html(pagingHtml);

    /* 총 카운트,페이지 수 표시 */
    $('#totalPage').text(totalPageCount);
    $('#totalCount').text(totalCount);
    $('#listCount').show();
}
```

### `function setPageNo(totalCount, totalPageCount)`

해당 스크립트 함수는 데이터 조회와 동시에 이뤄지는 페이징 처리 함수 이다.<br>
간단하게 순서에 맞게 설명을 해보려고 한다.<br>
<br>

1. 처음으로 이동 하는 a 태그 추가
2. 이전으로 이동 하는 a 태그 pageClick(nowPage - 1) 추가
3. 데이터 추출 한 형식과 동일하게 totalPageCount 를 통해 페이지 번호들 추출
4. 다음으로 이동하는 a 태그 pageClick(nowPage + 1) 추가
5. 끝으로 이동 하는 a 태그 추가
6. #listPaging 에 해당 html 추가
7. 총 카운트, 페이지 수 표시

### `LIMIT #{rowStart},#{rowLimit}`

현재 mybatis 를 사용 중이고 mapper 에 위와 같이 limit 함수를 통해<br>
데이터에 제한을 두고 페이징 처리를 완성 했다.<br>
<br>

### `전체 설명`

페이징 처리 하는 부분만 보고 있다.<br>
이해가 안될 수 있기에 전체적인 설명을 간략하게 하고 마무리 하려고 한다.<br>
<br>
해당 페이지는 데이터를 조회 하는 페이지로,<br>
request 와 동시에 client 부분에서 전역 변수인 nowPageNo 를 기준으로,<br>
`rowStart, rowLimit, listSize` 를 request 객체와 함께 담아준다.<br>
해당 요청 데이터를 기반으로 범위에 속하는 데이터를 가져온다.<br>
<br>
물론 totalCount 와, totalPageCount 를 구하려면 LIMIT 을 걸지 않고 검색조건에만 해당하는<br>
데이터를 한 번 더 조회하는 쿼리가 필요하다.<br>
<br>
이러면 백단에서 처리할 모든 과정이 끝난다<br>
가져온 데이터로 setPageNo() 함수 호출로 동적 페이징 처리가 완료 된다.<br>
<br>

## 마무리

오늘은 유용하게 사용 가능한 페이징 처리 하는 기능을 살펴보았다.<br>
페이징 처리하는 방법에는 여러가지 방법이 있다.<br>
<br>
이 구현 방식은 모든 페이징 처리를 앞단에서 조건을 걸고 백단에 요청을 한 케이스이다.<br>
이 방법 외 백단에서 모든 데이터를 가져온 뒤 객체 내부<br>
@setter 를 통해서 페이징 처리 하는 방법이 있을 수 있을 것이고,<br>
필터 없이 모든 데이터를 가져온 뒤 client 에서 hide 하는 방법도 있을 거 같다.<br>
<br>
이 구현 방법을 선택한 이유는 얼마나 큰 데이터일지도 모르고 count(*) 을 통해 <br>
`조회 쿼리의 속도`를 생각해서 구현했다.<br>
<br>
물론 해당 코드가 정답은 아니다.<br>
다양한 방법이 있고 해당 페이지에 맞는 페이징 처리를 하는 것이 중요할 거 같다.<br>
<br>

[sunghomong 의 깃 허브](https://github.com/sunghomong) <br>
[sunghomong 의 블로그](https://sunghomong.github.io/)
