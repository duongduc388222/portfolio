# CLAUDE.md
This file provides guidance to Claude Code (claude.ai/code) when working with all code in sub directories of this directory.

## Important Rules
0. Always create a plan and confirm with me before proceeding with its execution
1. First think through the problem, read the codebase for relevant files, and write a plan to tasks/todo.md.
2. The plan should have a list of todo items that you can check off as you complete them. Each step should also contain test(s) to validate that change(s) made work as expected.
4. For every step give me a high level explanation of what changes you plan to make
5. Once I confirmed the plan, you can work on the todo items, marking them as complete as you go.
6. Make every task and code change you do as simple as possible. We want to avoid making any massive or complex changes. Every change should impact as little code as possible. Simplicity is key.
7. Keep the code clean, avoid duplicate code. Each function added should have a doc string that explains what it is trying to achieve, along with expected inputs and output.
8. Check through all the code you wrote and make sure it follows security best practices. Make sure there are no sensitive information in the front end and no vulnerabilities that can be exploited
9. After the tests passed, check with me whether to keep the test files and make them part of the unit test
10. Finally, add a review section to the [todo.md](http://todo.md/) file with a summary of the changes you made and any other relevant information.
