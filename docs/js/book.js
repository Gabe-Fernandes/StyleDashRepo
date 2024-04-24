$(function () {
  function populateData(data) {
    $("#backToDocs").attr("href", data.callbackUrl);
    $("#bookTitle").html(data.title);
    $("#bookDescription").html(data.description);
    $("#visualImg").attr("src", data.visualSrc);

    for (let i = 0; i < data.reqCode.length; i++) {
      $("#reqSlideshowWrap").append(`
      <div id="reqSlideshow${i + 1}" class="req slideshow-shrink">
        <pre>
          <code id="codeEle${i}" class="code-snip">
            ${data.reqCode[i]}
          </code>
          <img tabindex="0" src="/icons/copy.png" id="copyBtn${i}" class="copy-btn btn text-btn" />
        </pre>
      </div>
    `);
    $(`#copyBtn${i}`).on("click", ()=> {
      const text = $(`#codeEle${i}`).text();
      navigator.clipboard.writeText(text);
    });
    $(`#copyBtn${i}`).on("keypress", addKeyboardAccessibility);
    }
    $("#reqSlideshow1").removeClass("slideshow-shrink");

    for (let i = 0; i < data.directions.length; i++) {
      $("#directionsList").append(`<li>${data.directions[i]}</li>`);
    }

    for (let i = 0; i < data.impCode.length; i++) {
      $("#impSlideshowWrap").append(`
        <div id="impSlideshow${i + 1}" class="imp slideshow-shrink">
          <pre>
            <code class="code-snip">
              ${data.impCode[i]}
            </code>
          </pre>
        </div>
      `);
    }
    $("#impSlideshow1").removeClass("slideshow-shrink");

    hljs.highlightAll();
  }

  function getBookData(bookId) {
    switch (bookId) {
      case "0": populateData(modalData); return;
      case "1": populateData(hideData); return;
      case "2": populateData(searchWrapData); return;
    }
  }

  const bookId = localStorage.getItem("bookId");
  getBookData(bookId);



  // slideshow for lib
  function createSlideShow(namespace) {
    const lastPage = $(`.${namespace}`).length;
    const slideshowWrap = $(`#${namespace}SlideshowWrap`);
    
    slideshowWrap.children(".slideshow-left:first").on("click", ()=> {
      let currentPage = parseInt(slideshowWrap.attr("data-page"));
      if (currentPage > 1) {
        $(`#${namespace}Slideshow${currentPage}`).addClass("slideshow-shrink");
        currentPage--;
        slideshowWrap.attr("data-page", currentPage);
        $(`#${namespace}Slideshow${currentPage}`).removeClass("slideshow-shrink");
      }
    });
    slideshowWrap.children(".slideshow-right:first").on("click", ()=> {
      let currentPage = parseInt(slideshowWrap.attr("data-page"));
      if (currentPage < lastPage) {
        $(`#${namespace}Slideshow${currentPage}`).addClass("slideshow-shrink");
        currentPage++;
        slideshowWrap.attr("data-page", currentPage);
        $(`#${namespace}Slideshow${currentPage}`).removeClass("slideshow-shrink");
      }
    });
    slideshowWrap.children(".slideshow-btn").on("click", ()=> {
      let currentPage = parseInt(slideshowWrap.attr("data-page"));
      $(`#${namespace}SlideshowCounter`).html(`Showing (${currentPage} of ${lastPage})`);
    });

    // init counter
    $(`#${namespace}SlideshowCounter`).html(`Showing (1 of ${lastPage})`);
  }

  // slideshow configuration
  createSlideShow("req");
  createSlideShow("imp");
});
