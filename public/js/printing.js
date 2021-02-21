const filesToPrint = [];
const uploadFiles = [];
const requests = [];
const typesWithPages = [
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/pdf"
];
const extensionsWithPages = [
  "rtf",
  "doc",
  "docx",
  "pdf",
  "odt",
];
const uploadStatuses = {
  pending: 0,
  uploading: 1,
  processing: 2,
  done: 3,
  error: 4
};

function handleChange(event) {

  [...event.target.files].forEach(file => {
    console.log(file);
    const reader = new FileReader();

    if (file.type.includes('image/')) {
      reader.readAsDataURL(file);
    } else if (file.type === "application/pdf") {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsBinaryString(file);
    }

    reader.onload = (e) => {
      filesToPrint.push({
        file,
        b64: btoa(reader.result),
        readerResult: reader.result,
        targetResult: e.target.result,
        copies: 1,
        pages: "",
        uniqueIndex: `_${getRandomString()}`
      });

      renderFilesRows();
    };
    reader.onerror = () => {
      console.log('there are some problems');
    };
  });
}

function updateCopies(event, index) {
  event.preventDefault();

  if (filesToPrint[index]) {
    filesToPrint[index].copies = event.target.value;
  }
}

function updatePages(event, index) {
  event.preventDefault();

  if (filesToPrint[index]) {
    filesToPrint[index].pages = event.target.value;
  }
}

function deleteFile(index) {
  if (filfilesToPrintes[index]) {
    filfilesToPrintes.splice(index, 1);
  }
  renderFilesRows();
}

function deleteFileByUniqueIndex(uniqueIndex) {
  const index = filesToPrint.findIndex(file => file.uniqueIndex === uniqueIndex);
  if (index === -1) {
    return;
  }
  deleteFile(index);
}

function handleSubmit(event) {
  event.preventDefault();

  runUpload();
}

function getFileExtension(file) {
  return file.name.split('.').slice(-1)[0];
}

function isFileWithPages(file) {
  return typesWithPages.includes(file.type)
    || extensionsWithPages.includes(getFileExtension(file));
}

function renderFilesRows() {
  let rows = '';
  filesToPrint.forEach((file, index) =>
    rows += `
      <tr data-index-file="${file.uniqueIndex}">
        <td class="name">
        <div>
          <progress-ring stroke="2" radius="15" progress="0" color="#09c" fill="#ccc"></progress-ring>
          <p title="${file.file.name}">${file.file.name}</p>
        </div>
        </td>
        <td>
          <input type="number" value="${file.copies}"
            onchange="updateCopies(event, ${index})" />
        </td>
        <td>
          ${isFileWithPages(file.file)
      ? `<input type="text"
          value="${file.pages}"
          placeholder="wszystkie"
          onchange="updatePages(event, ${index})" />`
      : ''
    }
        </td>

        <td class="delete">
          <button type="button" onclick="deleteFile(${index})">X</button>
        </td>
      </tr>
      `
  );
  document.querySelector('#files-table tbody').innerHTML = rows;
}

function runUpload() {
  for (const file of filesToPrint) {
    const index = file.uniqueIndex;

    requests[index] = upload(
      '/print',
      file.file,
      {
        copies: file.copies,
        pages: file.pages,
      },
      {
        onProgress: ev => updateUploadRow(ev, index),
        onAbort: () => deleteFileByUniqueIndex(index)
      }
    );
  }
}

function updateUploadRow(event, index) {
  const { loaded, total } = event;

  const progress = ((loaded * 100) / total).toFixed(0);

  const el = document.querySelector(`#files-table tr[data-index-file="${index}"] progress-ring`);

  el.setAttribute('progress', progress);

}