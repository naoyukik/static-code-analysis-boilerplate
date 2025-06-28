import {danger, fail} from 'danger';

/**
 * Run all checks
 */
function runChecks() {
  checkCommitMessages();
  // Additional checks can be added here in the future
}

/**
 * Check if any commit message starts with 'fixup!'
 */
function checkCommitMessages() {
  danger.git.commits.forEach((commit) => {
    if (commit.message.startsWith('fixup!')) {
      fail('Commit message contains "fixup".');
    }
  });
}

// Execute all checks
runChecks();
