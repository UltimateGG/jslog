# JS Log
My logging library util for JavaScript/TypeScript projects.

Creates a `logs/` folder in the root of your project and generates `MM-DD-YYYY.log` files. Prints formatted/expanded objects aswell.


Log *files* will have content, example:
```
[12/29/2023 at 16:01:59 | D: 0s] [INFO]: test 
```

Where "D: 0s" is the time since the last message. I love having this little feature in my logs because I like to quickly see how far apart messages are (Ex for purchases, errors, etc.).

The library also uses the native `console.log` (Or warn/error) function to print, so formatted objects will show. These messages do not contain the timestamp or diff for cleanliness sake.

# Usage
Just import the logInfo/logWarn/logError function and call it with your string/object. Just like the console.log function it accepts multiple arguments.

```typescript
import { logInfo } from '@ultimategg/logging';

logInfo('Hello', { a: true });
```

The reason I used function names and not params (Ex LogType.WARN) is just for developer experience and being brief.
