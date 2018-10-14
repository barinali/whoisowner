chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.type == 1) {
    setAssigneers();
  }
});

var setAssigneers = () => {
  const $table = document.querySelectorAll('.ghx-sprint-report-table table.aui');
  Array.prototype.forEach.call($table, table => {
    Array.prototype.forEach.call(table.querySelectorAll('tbody tr'), row => {
      const $row = row;
      const $firstColumn = $row.firstChild;
      const $exampleColumn = $firstColumn.nextSibling;

      $assigneeColumn = $exampleColumn.cloneNode();
      $row.insertBefore($assigneeColumn, $exampleColumn);

      const $issueLink = $firstColumn.querySelector('a');

      if ($issueLink) {
        const issueLink = $issueLink.getAttribute('href');

        ((node => {
          const xhr = new XMLHttpRequest();

          xhr.onreadystatechange = () => {
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
              const $loadedPage = document.implementation.createHTMLDocument().documentElement;
              $loadedPage.innerHTML = xhr.responseText;
              const $user = $loadedPage.querySelector('#assignee-val [data-user]');
              let user = { displayName: '-' };

              if ($user)
                user = JSON.parse($user.dataset.user)

              node.innerHTML = user.displayName;
            }
          };
          xhr.open("GET", issueLink, true);
          xhr.send();

        }))($assigneeColumn);
      }
    });
  });
};
