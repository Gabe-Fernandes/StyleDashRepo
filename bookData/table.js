const tableData = {
  callbackUrl: "/docs/html/docs.html#tableDiv",
  title: "Table",
  description: "- organize your data in rows and columns",
  visualSrc: "",
  reqCode: [
    `
    &lt;!--basic table--&gt;
&lt;div class=&quot;[tableNamespace]-table-wrap&quot;&gt;
  &lt;table&gt;
    &lt;thead&gt;
      &lt;tr&gt;
        &lt;th&gt;&lt;/th&gt;
        &lt;th&gt;&lt;/th&gt;
        &lt;th&gt;&lt;/th&gt;
      &lt;/tr&gt;
    &lt;/thead&gt;
    &lt;tbody&gt;
     
    &lt;/tbody&gt;
  &lt;/table&gt;
&lt;/div&gt;`,
   
    `&lt;!--col sort table--&gt;
&lt;div class=&quot;[tableNamespace]-table-wrap&quot;&gt;
  &lt;table&gt;
    &lt;thead&gt;
      &lt;tr&gt;
        &lt;th class=&quot;sortable-th&quot; id=&quot;th[ColName]&quot;&gt;&lt;/th&gt;
        &lt;th class=&quot;sortable-th&quot; id=&quot;th[ColName]&quot;&gt;&lt;/th&gt;
        &lt;th class=&quot;sortable-th&quot; id=&quot;th[ColName]&quot;&gt;&lt;/th&gt;
      &lt;/tr&gt;
    &lt;/thead&gt;
    &lt;tbody id=&quot;[tableNamespace]Tbody&quot;&gt;
      &lt;tr id=&quot;[tableNamespace]TR_[i]&quot;&gt;
        &lt;td class=&quot;sort[ColName]&quot;&gt;&lt;/td&gt;
      &lt;/tr&gt;
    &lt;/tbody&gt;
  &lt;/table&gt;
&lt;/div&gt;`,
   
    `&lt;!--filter tr--&gt;
&lt;tr&gt;
  &lt;th colspan=&quot;[numOfCols]&quot;&gt;
    &lt;div class=&quot;[tableNamespace]-search-wrap&quot;&gt;
      &lt;img src=&quot;/Icons/Search.png&quot; /&gt;
      &lt;input type=&quot;text&quot; id=&quot;[tableNamespace]Filter&quot; placeholder=&quot;search&quot; /&gt;
    &lt;/div&gt;
  &lt;/th&gt;
&lt;/tr&gt;`,
   
    `&lt;!--paginate table--&gt;
&lt;tr class=&quot;table-pagination-panel&quot;&gt;
  &lt;th colspan=&quot;[numOfCols]&quot;&gt;
    &lt;div class=&quot;table-pagination-wrap&quot;&gt;
      &lt;div class=&quot;results-per-page-wrap&quot;&gt;
        &lt;label&gt;Results Per Page: &lt;/label&gt;
        &lt;div class=&quot;input-validation-wrap&quot;&gt;
          &lt;input type=&quot;text&quot; id=&quot;[tableNamespace]ResultsPerPageInput&quot; autocomplete=&quot;off&quot; /&gt;
          &lt;span id=&quot;[tableNamespace]ResultsPerPageInputErr&quot; class=&quot;err hide&quot;&gt;&lt;/span&gt;
        &lt;/div&gt;
      &lt;/div&gt;

      &lt;div class=&quot;page-wrap&quot;&gt;
        &lt;img id=&quot;[tableNamespace]FirstPageBtn&quot; class=&quot;btn text-btn&quot; tabindex=&quot;0&quot; src=&quot;~/Icons/fastForwardDouble.png&quot; /&gt;
        &lt;img id=&quot;[tableNamespace]PrevPageBtn&quot; class=&quot;btn text-btn&quot; tabindex=&quot;0&quot; src=&quot;~/Icons/fastForwardSingle.png&quot; /&gt;
        &lt;div class=&quot;input-validation-wrap&quot;&gt;
          &lt;input id=&quot;[tableNamespace]CurrentPageInput&quot; type=&quot;text&quot; autocomplete=&quot;off&quot; /&gt;
          &lt;span id=&quot;[tableNamespace]CurrentPageInputErr&quot; class=&quot;err hide&quot;&gt;&lt;/span&gt;
        &lt;/div&gt;
        &lt;img id=&quot;[tableNamespace]NextPageBtn&quot; class=&quot;btn text-btn&quot; tabindex=&quot;0&quot; src=&quot;~/Icons/fastForwardSingle.png&quot; /&gt;
        &lt;img id=&quot;[tableNamespace]LastPageBtn&quot; class=&quot;btn text-btn&quot; tabindex=&quot;0&quot; src=&quot;~/Icons/fastForwardDouble.png&quot; /&gt;
      &lt;/div&gt;

      &lt;div class=&quot;showing-results-wrap&quot;&gt;
        &lt;label id=&quot;[tableNamespace]ShowingResultsLabel&quot;&gt;&lt;/label&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/th&gt;
&lt;/tr&gt;  `
  ],
  directions: ["add table html wrapped in a div with the [tableNamespace]-table-wrap style and @include TableWrap on it with args", "find/replace is recommended for [tableNamespace]", "paste the basic or col sorting table",  "paste optional TRs in Thead for filtering or pagination"],
  impCode: [
    `
    @mixin TableWrap($w, $h, $c1, $c2, $cHead, $cHover, $hideScroll: false) {
    @include WidthHeight($w, $h);
    display: block;
    border-radius: 0.5rem;
    background-color: $c1;
    transition: width 0.3s;

    @if $hideScroll{
      overflow: hidden;
      &::-webkit-scrollbar{
        display: none;
      }
      scrollbar-width: none;
    }
    overflow-y: auto;
    table{
      width: 100%;
      border-collapse: collapse;
      th{
        padding: 1rem;
        background-color: $cHead;
        position: sticky;
        top: 0px;
        z-index: $zTable;
      }
      .sortable-th {
        cursor: pointer;
      }
      .sortable-th:active {
        transform: scale(0.94);
        transform: translateY(5%);
        box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
      }
      tr:nth-child(odd){
        background-color: $c2;
      }
      tr{
        transition: background-color 0.3s;
        &:hover{
          background-color: $cHover !important;
        }
      }
      td{
        padding: 1rem;
        text-align: center;
      }
      .table-pagination-panel {
        .table-pagination-wrap {
          @media (max-width: $bmaxLaptop) {
            flex-direction: column;
          }
          @include Flex-Row(center, center, 100%, initial);
          .results-per-page-wrap {
            @include Flex-Row(flex-start, center, 100%, initial);
            margin-left: 5vw;
            @media (max-width: $bmaxLaptop) {
              justify-content: center;
              margin: 1vh 0vw;
            }
          }
          .page-wrap {
            @include Flex-Row(center, center, 100%, initial);
            @media (max-width: $bmaxLaptop) {
              margin: 1vh 0vw;
            }
          }
          .showing-results-wrap {
            @include Flex-Row(flex-end, center, 100%, initial);
            @media (max-width: $bmaxLaptop) {
              justify-content: center;
            }
            margin-right: 5vw;
          }
        }
        #firstPageBtn, #prevPageBtn {
          transform: rotate(180deg);
        }
        .input-validation-wrap {
          input {
            width: 3vw;
            @media (max-width: $bmaxLaptop) {
              width: 8vw;
            }
            margin: 0vh 1vw;
            text-align: center;
            text-indent: 0%;
            transition: width 0.3s;
          }
          span {
            top: -150%;
            border: 2px solid $cWarning;
          }
        }
      }
    }
  }`,
    `
    _______________`
  ]
}