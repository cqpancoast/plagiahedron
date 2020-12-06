# Style guide
The following are our style conventions for the project 

## Naming conventions
- `FileNames`: Pascal Case
- `ClassNames`: Pascal Case
- `IInterfaceNames`: Pascal Case, always preceded by an "I"
- `functionNames`: Camel Case
- `variableNames`: Camel Case
- `ENUM_ELEMENTS`: all upper case, individual words separated by an underscore
- `GLOBAL_VARIABLES`: all upper case, individual words separated by an underscore

## Function Declarations
All function declarations will use a colon, not an arrow

```
public exampleFunction(): void {}
```

## General Project Conventions

### Comments
All comments in the project will be in JavaDoc notation

```
/**
* Returns the inputted string as an example 
* function to show JavaDoc notations

* @param  example  a string to represent the example
* @return          the inputted example string
*/

public exampleFunction(example: string): string { return example }
```

### Semicolon Usage
Semicolons at the ends of lines are not currently required in this project but that is subject to change. 
