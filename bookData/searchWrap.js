const searchWrapData = {
  callbackUrl: "/docs/html/docs.html#searchWrapDiv",
  title: "Search Wrap",
  description: "- a textbox with an image (usually magnifying glass) in it",
  visualSrc: "/codeImgs/searchWrapVisual.PNG",
  reqCode: [
    `
    &lt;div class=&quot;my-class-name&quot;&gt;
      &lt;img src=&quot;/myImage.png&quot; /&gt;
      &lt;input type=&quot;text&quot; placeholder=&quot;search...&quot; /&gt;
    &lt;/div&gt;`,
    
    `
    .my-class-name {
      @include SearchDiv(1rem, 20vw, 5vh);
    }`
  ],
  directions: ["wrap an img element and an input element in a div", "selecting the div, include SearchDiv with arguments for font-size, width, and height"],
  impCode: [`
    @mixin SearchDiv($fontSize, $w, $h) {
      @include Flex-Col(center, center, $w, $h);
      position: relative;
      input{
        @include WidthHeight(100%, 100%);
        font-size: $fontSize;
        border-radius: 0.417 * $fontSize;
        text-indent: 16%;
      }
      img{
        @include Img-Round(1.333 * $fontSize);
        position: absolute;
        left: 2.5%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }`
  ]
}
