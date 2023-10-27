import * as React from 'react';
import { createComponent } from "@lit-labs/react";
import { MultiMedSaver } from "@vertical-insure/web-components/index.js";

const MultiMedSaverComponent = createComponent({
  tagName: "multi-med-saver",
  elementClass: MultiMedSaver,
  react: React,
  events: {
    onChange: "change",
    onLoadedQuote: "loaded-quote",
  },
});

export {
  MultiMedSaverComponent
}