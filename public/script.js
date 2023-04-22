import hljs from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/highlight.min.js";
import protobuf from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/languages/protobuf.min.js";
import javascript from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/languages/javascript.min.js";
import json from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/languages/json.min.js";
hljs.registerLanguage("protobuf", protobuf);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("json", json);
hljs.highlightAll();
