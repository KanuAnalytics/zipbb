# zipbb

This Python module reads a `.zipbb` file in the root directory, which lists file and directory locations, and extracts script files' relative paths, filenames, and content. The content can be limited to a maximum number of characters using a flag.

## Features

- Reads file and directory locations from `.zipbb`.
- Recursively collects script files from listed directories.
- Extracts and prints/writes script data to a JSON file.
- Supports limiting the number of characters read from each script file.

## Requirements

- Python 3.x

## Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory and run:
   ```sh
   pip install .
   ```

## Usage

- **Create the initial `.zipbb` file**:
  ```sh
  zipbb quickstart
  ```

- **Parse `.zipbb` and create `scripts_data.json`**:
  ```sh
  zipbb zip -m 1000  # Limit to 1000 characters per file
  # or
  zipbb zip  # Read entire content of each file
  ```

## Example

Given the following `.zipbb` content:
```
elegantLayout/
requirements.txt
```

Running `zipbb zip -m 1000` will create `scripts_data.json` with the relative paths, filenames, and up to 1000 characters of content from each script file.
```