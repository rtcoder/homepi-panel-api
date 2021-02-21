const filesToPrint = [];
let uploadFiles = {};
let requests = {};
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
      const uniqueIndex = `_${getRandomString()}`;

      filesToPrint.push({
        file,
        b64: btoa(reader.result),
        readerResult: reader.result,
        targetResult: e.target.result,
        copies: 1,
        pages: "",
        uniqueIndex
      });

      for (const fileToPrint of filesToPrint) {
        uploadFiles[fileToPrint.uniqueIndex] = {
          loaded: 0,
          total: fileToPrint.file.size,
        };
      }


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
  if (filesToPrint[index]) {
    filesToPrint.splice(index, 1);
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
  requests = {};

  document.querySelector('label').style.display = 'none';

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
  const { loaded } = event;

  uploadFiles[index].loaded = loaded;

  updateProgress();
}

function updateProgress() {
  const { loaded, total } = getFullProgressData();

  const progress = ((loaded * 100) / total).toFixed(0);

  const el = document.querySelector(`progress-ring`);

  console.log({ progress, loaded, total })
  if (progress === '100') {

    console.log('tutaj')
    setTimeout(() => {
      console.log('tutaj w settimeout')
      document.querySelector('label').style.display = 'flex';
    }, 1000);
  }

  el.setAttribute('progress', progress);
}

function getFullProgressData() {
  let total = 0;
  let loaded = 0;

  Object.keys(uploadFiles).forEach(key => {
    total += uploadFiles[key].total;
    loaded += uploadFiles[key].loaded;
  });

  return {
    total,
    loaded
  }
}