chrome.runtime.onMessage.addListener(function(msg, sender) {
  if (msg.type == 1) {
    setAssigneers();
  }
});

var setAssigneers = function() {
  var $table = document.querySelectorAll('.ghx-sprint-report-table table.aui');
  Array.prototype.forEach.call($table, function(table) {
    Array.prototype.forEach.call(table.querySelectorAll('tbody tr'), function(row) {
      var $row = row;
      var $firstColumn = $row.firstChild;
      var $exampleColumn = $firstColumn.nextSibling;

      $assigneeColumn = $exampleColumn.cloneNode();
      $row.insertBefore($assigneeColumn, $exampleColumn);

      var $issueLink = $firstColumn.querySelector('a');

      if ($issueLink) {
        var issueLink = $issueLink.getAttribute('href');

        (function(node) {
          var xhr = new XMLHttpRequest();

          xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
              var $loadedPage = document.implementation.createHTMLDocument().documentElement;
              $loadedPage.innerHTML = xhr.responseText;
              var $user = $loadedPage.querySelector('#assignee-val [data-user]');
              var user = { displayName: '-' };

              if ($user)
                user = JSON.parse($user.dataset.user)

              node.innerHTML = user.displayName;
            }
          };
          xhr.open("GET", issueLink, true);
          xhr.send();

        })($assigneeColumn);
      }
    });
  });
};
