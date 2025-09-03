document.addEventListener("DOMContentLoaded", () => {
  const textInput = document.getElementById("text-input");
  const languageSelect = document.getElementById("language-select");
  const outputText = document.getElementById("output-text");

  const viewOrderedBtn = document.getElementById("view-ordered-btn");
  const viewScriptBtn = document.getElementById("view-script-btn");
  const backToTopBtn = document.getElementById("back-to-top-btn");

  const viewOrderedList = document.getElementById("view-ordered-list");
  const viewScriptList = document.getElementById("view-script-list");

  const symbolListOrdered = document.getElementById("symbol-list-ordered");
  const symbolListScript = document.getElementById("symbol-list-script");

  let foundSymbolsData = [];

  const unicodeBlocks = [
    { name: "Armenian", script: "Armenian", start: 0x0530, end: 0x058f },
    { name: "Arabic", script: "Arabic", start: 0x0600, end: 0x06ff },
    { name: "Bengali", script: "Bengali", start: 0x0980, end: 0x09ff },
    { name: "Cyrillic", script: "Cyrillic", start: 0x0400, end: 0x04ff },
    { name: "Georgian", script: "Georgian", start: 0x10a0, end: 0x10ff },
    {
      name: "Georgian Supplement",
      script: "Georgian",
      start: 0x2d00,
      end: 0x2d2f,
    },
    { name: "Greek and Coptic", script: "Greek", start: 0x0370, end: 0x03ff },
    { name: "Hebrew", script: "Hebrew", start: 0x0590, end: 0x05ff },
    { name: "Devanagari", script: "Devanagari", start: 0x0900, end: 0x097f },
    { name: "Hangul", script: "Hangul", start: 0x1100, end: 0x11ff },
    {
      name: "Hangul Compatibility Jamo",
      script: "Hangul",
      start: 0x3130,
      end: 0x318f,
    },
    { name: "Hangul Syllables", script: "Hangul", start: 0xac00, end: 0xd7af },
    { name: "Latin", script: "Latin", start: 0x0041, end: 0x007a },
    { name: "Thai", script: "Thai", start: 0x0e00, end: 0x0e7f },
    {
      name: "General Punctuation",
      script: "Common",
      start: 0x2000,
      end: 0x206f,
    },
    {
      name: "C0 Controls and Basic Latin",
      script: "Common",
      start: 0x0000,
      end: 0x007f,
    },
    {
      name: "Latin-1 Supplement",
      script: "Common",
      start: 0x0080,
      end: 0x00ff,
    },
  ];

  const getSymbolDetails = (char) => {
    const code = char.charCodeAt(0);
    for (const block of unicodeBlocks) {
      if (code >= block.start && code <= block.end) {
        return { name: block.name, script: block.script, unicode: code };
      }
    }
    return { name: "Unknown Block", script: "Unknown", unicode: code };
  };

  const languageData = {
    English: {
      ranges: [
        [0x0041, 0x005a],
        [0x0061, 0x007a],
      ],
      extra: [],
    },
    Armenian: {
      ranges: [[0x0531, 0x058f]],
      extra: [],
    },
    Arabic: {
      ranges: [
        [0x0621, 0x064a],
        [0x0660, 0x0669],
        [0x0671, 0x06d3],
        [0x06d5, 0x06ff],
      ],
      extra: [],
    },
    Azerbaijani: {
      ranges: [
        [0x0041, 0x005a],
        [0x0061, 0x007a],
      ],
      extra: ["Ə", "ə", "Ğ", "ğ", "İ", "ı", "Ö", "ö", "Ş", "ş", "Ü", "ü"],
    },
    Bengali: {
      ranges: [[0x0980, 0x09ff]],
      extra: [],
    },
    Bulgarian: {
      ranges: [[0x0400, 0x04ff]],
      extra: [],
    },
    Croatian: {
      ranges: [
        [0x0041, 0x005a],
        [0x0061, 0x007a],
      ],
      extra: ["Č", "č", "Ć", "ć", "Đ", "đ", "Š", "š", "Ž", "ž"],
    },
    Czech: {
      ranges: [
        [0x0041, 0x005a],
        [0x0061, 0x007a],
      ],
      extra: [
        "Á",
        "á",
        "Č",
        "č",
        "Ď",
        "ď",
        "É",
        "é",
        "Ě",
        "ě",
        "Í",
        "í",
        "Ň",
        "ň",
        "Ó",
        "ó",
        "Ř",
        "ř",
        "Š",
        "š",
        "Ť",
        "ť",
        "Ú",
        "ú",
        "Ů",
        "ů",
        "Ý",
        "ý",
        "Ž",
        "ž",
      ],
    },
    Georgian: {
      ranges: [
        [0x10a0, 0x10ff],
        [0x2d00, 0x2d2f],
      ],
      extra: [],
    },
    Greek: {
      ranges: [
        [0x0370, 0x03ff],
        [0x1f00, 0x1fff],
      ],
      extra: [],
    },
    Hebrew: {
      ranges: [[0x0590, 0x05ff]],
      extra: [],
    },
    Hindi: {
      ranges: [[0x0900, 0x097f]],
      extra: [],
    },
    Italian: {
      ranges: [
        [0x0041, 0x005a],
        [0x0061, 0x007a],
      ],
      extra: ["À", "à", "È", "è", "É", "é", "Ì", "ì", "Ò", "ò", "Ù", "ù"],
    },
    Kazakh: {
      ranges: [[0x0400, 0x04ff]],
      extra: [],
    },
    Korean: {
      ranges: [
        [0x1100, 0x11ff],
        [0x3131, 0x318e],
        [0xac00, 0xd7a3],
      ],
      extra: [],
    },
    Kyrgyz: {
      ranges: [[0x0400, 0x04ff]],
      extra: [],
    },
    Malay: {
      ranges: [
        [0x0041, 0x005a],
        [0x0061, 0x007a],
      ],
      extra: [],
    },
    Polish: {
      ranges: [
        [0x0041, 0x005a],
        [0x0061, 0x007a],
      ],
      extra: [
        "Ą",
        "ą",
        "Ć",
        "ć",
        "Ę",
        "ę",
        "Ł",
        "ł",
        "Ń",
        "ń",
        "Ó",
        "ó",
        "Ś",
        "ś",
        "Ż",
        "ż",
        "Ź",
        "ź",
      ],
    },
    Portuguese: {
      ranges: [
        [0x0041, 0x005a],
        [0x0061, 0x007a],
      ],
      extra: [
        "À",
        "à",
        "Á",
        "á",
        "Â",
        "â",
        "Ã",
        "ã",
        "Ç",
        "ç",
        "É",
        "é",
        "Ê",
        "ê",
        "Í",
        "í",
        "Ó",
        "ó",
        "Ô",
        "ô",
        "Õ",
        "õ",
        "Ú",
        "ú",
      ],
    },
    Romanian: {
      ranges: [
        [0x0041, 0x005a],
        [0x0061, 0x007a],
      ],
      extra: ["Ă", "ă", "Â", "â", "Î", "î", "Ș", "ș", "Ț", "ț"],
    },
    Tajik: {
      ranges: [[0x0400, 0x04ff]],
      extra: [],
    },
    Thai: {
      ranges: [[0x0e00, 0x0e7f]],
      extra: [],
    },
    Ukrainian: {
      ranges: [[0x0400, 0x04ff]],
      extra: ["І", "і", "Ї", "ї", "Є", "є", "Ґ", "ґ"],
    },
    Urdu: {
      ranges: [[0x0600, 0x06ff]],
      extra: [],
    },
    Uzbek: {
      ranges: [
        [0x0041, 0x005a],
        [0x0061, 0x007a],
      ],
      extra: ["Oʻ", "oʻ", "Gʻ", "gʻ", "Ch", "ch", "Sh", "sh"],
    },
    Vietnamese: {
      ranges: [
        [0x0041, 0x005a],
        [0x0061, 0x007a],
      ],
      extra: [
        "Á",
        "á",
        "À",
        "à",
        "Ả",
        "ả",
        "Ã",
        "ã",
        "Ạ",
        "ạ",
        "Ă",
        "ă",
        "Ắ",
        "ắ",
        "Ằ",
        "ằ",
        "Ẳ",
        "ẳ",
        "Ẵ",
        "ẵ",
        "Ặ",
        "ặ",
        "Â",
        "â",
        "Ấ",
        "ấ",
        "Ầ",
        "ầ",
        "Ẩ",
        "ẩ",
        "Ẫ",
        "ẫ",
        "Ậ",
        "ậ",
        "Đ",
        "đ",
        "É",
        "é",
        "È",
        "è",
        "Ẻ",
        "ẻ",
        "Ẽ",
        "ẽ",
        "Ẹ",
        "ẹ",
        "Ê",
        "ê",
        "Ế",
        "ế",
        "Ề",
        "ề",
        "Ể",
        "ể",
        "Ễ",
        "ễ",
        "Ệ",
        "ệ",
        "Í",
        "í",
        "Ì",
        "ì",
        "Ỉ",
        "ỉ",
        "Ĩ",
        "ĩ",
        "Ị",
        "ị",
        "Ó",
        "ó",
        "Ò",
        "ò",
        "Ỏ",
        "ỏ",
        "Õ",
        "õ",
        "Ọ",
        "ọ",
        "Ô",
        "ô",
        "Ố",
        "ố",
        "Ồ",
        "ồ",
        "Ổ",
        "ổ",
        "Ỗ",
        "ỗ",
        "Ộ",
        "ộ",
        "Ơ",
        "ơ",
        "Ớ",
        "ớ",
        "Ờ",
        "ờ",
        "Ở",
        "ở",
        "Ỡ",
        "ỡ",
        "Ợ",
        "ợ",
        "Ú",
        "ú",
        "Ù",
        "ù",
        "Ủ",
        "ủ",
        "Ũ",
        "ũ",
        "Ụ",
        "ụ",
        "Ư",
        "ư",
        "Ứ",
        "ứ",
        "Ừ",
        "ừ",
        "Ử",
        "ử",
        "Ữ",
        "ữ",
        "Ự",
        "ự",
        "Ý",
        "ý",
        "Ỳ",
        "ỳ",
        "Ỷ",
        "ỷ",
        "Ỹ",
        "ỹ",
        "Ỵ",
        "ỵ",
      ],
    },
  };

  const isAllowedChar = (char, language) => {
    const langData = languageData[language];
    if (!langData) return true;

    const code = char.charCodeAt(0);
    for (const range of langData.ranges) {
      if (code >= range[0] && code <= range[1]) {
        return true;
      }
    }

    if (langData.extra.includes(char)) {
      return true;
    }

    // Allow common characters like spaces, numbers, and basic punctuation
    if (
      (code >= 0x0020 && code <= 0x002f) ||
      (code >= 0x0030 && code <= 0x0039) ||
      (code >= 0x003a && code <= 0x0040) ||
      (code >= 0x005b && code <= 0x0060) ||
      (code >= 0x007b && code <= 0x007e)
    ) {
      return true;
    }
    return false;
  };

  const renderOrderedList = () => {
    symbolListOrdered.innerHTML = "";
    if (foundSymbolsData.length === 0) {
      symbolListOrdered.innerHTML = `<li class="p-2 text-gray-500">No foreign symbols found.</li>`;
      return;
    }

    foundSymbolsData.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `Symbol: "${
        item.symbol
      }" | Unicode: U+${item.details.unicode
        .toString(16)
        .toUpperCase()
        .padStart(4, "0")} | Block: ${item.details.name} | Script: ${
        item.details.script
      }`;
      li.classList.add(
        "p-2",
        "bg-gray-100",
        "rounded-md",
        "text-gray-700",
        "mb-2"
      );
      symbolListOrdered.appendChild(li);
    });
  };

  const renderScriptList = () => {
    symbolListScript.innerHTML = "";
    if (foundSymbolsData.length === 0) {
      symbolListScript.innerHTML = `<li class="p-2 text-gray-500">No foreign symbols found.</li>`;
      return;
    }

    const groupedByScriptAndBlock = {};
    foundSymbolsData.forEach((item) => {
      const { script, name, unicode } = item.details;
      if (!groupedByScriptAndBlock[script]) {
        groupedByScriptAndBlock[script] = {};
      }
      if (!groupedByScriptAndBlock[script][name]) {
        groupedByScriptAndBlock[script][name] = {};
      }
      const symbolKey = `${item.symbol}-${unicode}`;
      if (!groupedByScriptAndBlock[script][name][symbolKey]) {
        groupedByScriptAndBlock[script][name][symbolKey] = {
          symbol: item.symbol,
          unicode: unicode,
          count: 0,
        };
      }
      groupedByScriptAndBlock[script][name][symbolKey].count++;
    });

    for (const script in groupedByScriptAndBlock) {
      const scriptGroup = document.createElement("li");
      scriptGroup.classList.add(
        "p-4",
        "bg-gray-100",
        "rounded-md",
        "text-gray-700",
        "mb-4"
      );
      const scriptHeader = document.createElement("h3");
      scriptHeader.classList.add("font-semibold", "text-lg", "text-gray-800");
      scriptHeader.textContent = `${script} Script`;
      scriptGroup.appendChild(scriptHeader);

      const blockList = document.createElement("ul");
      blockList.classList.add("space-y-2", "mt-2");

      for (const block in groupedByScriptAndBlock[script]) {
        const blockGroup = document.createElement("li");
        const blockHeader = document.createElement("h4");
        blockHeader.classList.add("font-medium", "text-base", "text-gray-700");
        blockHeader.textContent = `Block: ${block}`;
        blockGroup.appendChild(blockHeader);

        const symbolSubList = document.createElement("ul");
        symbolSubList.classList.add("pl-4", "space-y-1");
        for (const symbolKey in groupedByScriptAndBlock[script][block]) {
          const symbolItem = groupedByScriptAndBlock[script][block][symbolKey];
          const symbolLi = document.createElement("li");
          symbolLi.textContent = `Symbol: "${
            symbolItem.symbol
          }" | Unicode: U+${symbolItem.unicode
            .toString(16)
            .toUpperCase()
            .padStart(4, "0")} (${symbolItem.count} occurrence${
            symbolItem.count > 1 ? "s" : ""
          })`;
          symbolLi.classList.add("text-sm", "text-gray-600");
          symbolSubList.appendChild(symbolLi);
        }
        blockGroup.appendChild(symbolSubList);
        blockList.appendChild(blockGroup);
      }
      scriptGroup.appendChild(blockList);
      symbolListScript.appendChild(scriptGroup);
    }
  };

  const showView = (viewId) => {
    viewOrderedList.classList.add("hidden");
    viewScriptList.classList.add("hidden");

    document.getElementById(viewId).classList.remove("hidden");

    viewOrderedBtn.classList.remove("active");
    viewScriptBtn.classList.remove("active");

    document
      .querySelector(`#${viewId.replace("-list", "-btn")}`)
      .classList.add("active");
  };

  const processText = () => {
    const text = textInput.value;
    const language = languageSelect.value;
    let htmlOutput = "";
    foundSymbolsData = [];

    const lines = text.split("\n");
    htmlOutput = lines
      .map((line) => {
        let lineOutput = "";
        for (const char of line) {
          const isForeign = !isAllowedChar(char, language);
          if (isForeign) {
            lineOutput += `<span class="highlight">${char}</span>`;
            const details = getSymbolDetails(char);
            foundSymbolsData.push({ symbol: char, details });
          } else {
            lineOutput += char;
          }
        }
        return lineOutput;
      })
      .join("\n");

    outputText.innerHTML = htmlOutput;
    renderOrderedList();
    renderScriptList();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  textInput.addEventListener("input", processText);
  languageSelect.addEventListener("change", processText);

  viewOrderedBtn.addEventListener("click", () => showView("view-ordered-list"));
  viewScriptBtn.addEventListener("click", () => showView("view-script-list"));
  backToTopBtn.addEventListener("click", scrollToTop);

  // Initial run on page load
  processText();
});
