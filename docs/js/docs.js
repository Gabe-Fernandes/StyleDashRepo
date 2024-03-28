$(function () {
  $("#bookFilter").on("input", ()=>{
    const filter = $("#bookFilter").val().toLowerCase();
  
    const books = $(".book");
  
    for (let i = 0; i < books.length; i++) {
      const currentBook = books.eq(i);
      const dataTags = currentBook.attr("data-tags");
  
      if (dataTags.includes(filter)) {
        currentBook.removeClass("fade-abs");
      }
      else {
        currentBook.addClass("fade-abs");
      }
    }
  });

  $(".book-link").on("click", (event)=> {
    const bookId = $(event.target).attr("data-bookId");
    localStorage.setItem("bookId", bookId);
  });
});
