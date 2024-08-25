# zipbb

This Python module reads a `.zipbb` file in the root directory, which lists file and directory locations, and extracts script files' relative paths, filenames, and content. It then creates a directed graph representing the structure of the repository, where file nodes are weighted by file length.

## Features

- Reads file and directory locations from `.zipbb`.
- Recursively collects script files from listed directories.
- Extracts and prints/writes script data to a JSON file.
- Creates a directed graph where nodes are files, and edges represent directory structure.
- Weights nodes by normalized file length.
- Saves and reloads the graph from JSON format.
- Visualizes the graph with `matplotlib`.

## Requirements

- Python 3.x
- `networkx` and `matplotlib` (automatically installed with `pip install .`)

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

- **Parse `.zipbb` and create `graph_data.json`**:
```sh
  zipbb graph
``` 

- **Parse `.zipbb` and create `function_graph_data.json`**:
```sh
  zipbb function_graph
``` 

## Example

Given the following `.zipbb` content:
```
elegantLayout/
requirements.txt
```

Running `zipbb zip -m 1000` will create `scripts_data.json` with the relative paths, filenames, and up to 1000 characters of content from each script file.
```