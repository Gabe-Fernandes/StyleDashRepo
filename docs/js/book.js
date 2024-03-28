$(function () {
  const modalData = {
    callbackUrl: "/docs/html/docs.html#modalsDiv",
    title: "Modal",
    description: "- A window that appears on screen with a fade transition",
    visualSrc: "/codeImgs/searchWrapVisual.PNG",
    htmlSrc: "/codeImgs/searchWrapHtmlCode.PNG",
    sassSrc: "/codeImgs/searchWrapSassCode.PNG",
    directions: ["wrap an img element and an input element in a div", "selecting the div, include SearchDiv with arguments for font-size, width, and height"],
    implementationSrc: "/codeImgs/searchWrapLibSassCode.PNG"
  }
  const hideData = {
    callbackUrl: "/docs/html/docs.html#hideDiv",
    title: "Hide",
    description: "- Change the visibility of elements in various ways",
    visualSrc: "/codeImgs/searchWrapVisual.PNG",
    htmlSrc: "/codeImgs/searchWrapHtmlCode.PNG",
    sassSrc: "/codeImgs/searchWrapSassCode.PNG",
    directions: ["wrap an img element and an input element in a div", "selecting the div, include SearchDiv with arguments for font-size, width, and height"],
    implementationSrc: "/codeImgs/searchWrapLibSassCode.PNG"
  }
  const searchWrapData = {
    callbackUrl: "/docs/html/docs.html#searchWrapDiv",
    title: "Search Wrap",
    description: "- a textbox with an image (usually magnifying glass) in it",
    visualSrc: "/codeImgs/searchWrapVisual.PNG",
    htmlSrc: "/codeImgs/searchWrapHtmlCode.PNG",
    sassSrc: "/codeImgs/searchWrapSassCode.PNG",
    directions: ["wrap an img element and an input element in a div", "selecting the div, include SearchDiv with arguments for font-size, width, and height"],
    implementationSrc: "/codeImgs/searchWrapLibSassCode.PNG"
  }

  function populateData(data) {
    $("#backToDocs").attr("href", data.callbackUrl);
    $("#bookTitle").html(data.title);
    $("#bookDescription").html(data.description);
    $("#visualImg").attr("src", data.visualSrc);
    $("#htmlImg").attr("src", data.htmlSrc);
    $("#sassImg").attr("src", data.sassSrc);
    for (let i = 0; i < data.directions.length; i++) {
      $("#directionsList").append(`<li>${data.directions[i]}</li>`);
    }
    $("#implementationImg").attr("src", data.implementationSrc);
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
});
