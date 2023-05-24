export default function strongPasswordChecker(password) {
  // Method to check whether the input string contains the lower case, upper case, digit
  function countTypes(passwordString) {
    let a = 0;
    let b = 0;
    let c = 0;
    for (let i = 0; i < passwordString.length; i++) {
      const ch = passwordString.charAt(i);
      if (ch.match(/[a-z]/)) {
        a = 1;
      } else if (ch.match(/[A-Z]/)) {
        b = 1;
      } else if (ch.match(/[0-9]/)) {
        c = 1;
      }
    }
    return a + b + c;
  }

  const types = countTypes(password);
  const n = password.length;

  // return the number of steps needed to add if password length is < 6
  if (n < 6) {
    return Math.max(6 - n, 3 - types);
  }

  // find the consecutive occurence in the password if the length <= 20
  if (n <= 20) {
    let replace = 0;
    let count = 0;
    let prev = "";
    for (let i = 0; i < n; i++) {
      const curr = password.charAt(i);
      if (curr === prev) {
        count += 1;
      } else {
        replace += Math.floor(count / 3);
        count = 1;
        prev = curr;
      }
    }
    replace += Math.floor(count / 3);
    return Math.max(replace, 3 - types);
  }

  // find the consecutive occurence in the password if the length > 20
  let replace = 0;
  let count = 0;
  let remove = n - 20;
  let remove2 = 0;
  let prev = "";
  for (let i = 0; i < n; i++) {
    const curr = password.charAt(i);
    if (curr === prev) {
      count += 1;
    } else {
      if (remove > 0 && count >= 3) {
        if (count % 3 === 0) {
          remove -= 1;
          replace -= 1;
        } else if (count % 3 === 1) {
          remove2 += 1;
        }
      }
      replace += Math.floor(count / 3);
      count = 1;
      prev = curr;
    }
  }

  if (remove > 0 && count >= 3) {
    if (count % 3 === 0) {
      remove -= 1;
      replace -= 1;
    } else if (count % 3 === 1) {
      remove2 += 1;
    }
  }

  replace += Math.floor(count / 3);
  const item = Math.min(replace, remove2, Math.floor(remove / 2));
  replace -= item;
  remove -= item * 2;

  const item2 = Math.min(replace, Math.floor(remove / 3));
  replace -= item2;
  remove -= item2 * 3;

  return n - 20 + Math.max(replace, 3 - types);
}
