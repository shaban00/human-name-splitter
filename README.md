Human name splitter
---

Libarary for splitting human name into first name, last name, salutation, suffix & initials

Usage:
---

```javascript
import {splitter} from "human-name-splitter"

const result = splitter("Mr. Mario De Vacelo Parirato IV")
console.log(result)
```

Result:
---

```javascript
  {
      salutation: "Mr.",
      firstName: "Mario",
      lastName: "De Vacelo Parirato",
      initials: "",
      suffix: "IV",
  }
```