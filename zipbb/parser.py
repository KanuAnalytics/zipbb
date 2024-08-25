## Add function_graph argparse
import os
import json
import argparse
import networkx as nx
import ast
import matplotlib.pyplot as plt
from .graph_creator import create_graph, save_graph_to_json, load_graph_from_json, plot_graph
from .function_graph_creator import extract_function_data, create_function_graph, save_function_graph_to_json, load_function_graph_from_json, plot_function_graph

def read_zipbb_file(zipbb_path):
    locations = []
    with open(zipbb_path, 'r') as file:
        for line in file:
            line = line.strip()
            if line and not line.startswith('#'):  # ignore empty lines and comments
                locations.append(line)
    return locations

def get_all_files(locations):
    all_files = []
    for location in locations:
        if os.path.isfile(location):
            all_files.append(location)
        elif os.path.isdir(location):
            for root, _, files in os.walk(location):
                for file in files:
                    all_files.append(os.path.join(root, file))
    return all_files

def extract_script_data(files, max_chars=None):
    script_data = []
    file_lengths = []
    
    for file_path in files:
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                code = file.read(max_chars) if max_chars else file.read()
                file_length = len(code)
                file_lengths.append(file_length)
                script_data.append({
                    'relative_path': os.path.relpath(file_path),
                    'file_name': os.path.basename(file_path),
                    'code': code,
                    'length': file_length
                })
        except (IOError, UnicodeDecodeError) as e:
            print(f"Skipping file {file_path}: {e}")
        except Exception as e:
            print(f"An unexpected error occurred while reading {file_path}: {e}")

    return script_data, max(file_lengths, default=1)

def write_json(data, output_path='scripts_data.json'):
    with open(output_path, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, indent=4, ensure_ascii=False)

def create_zipbb_file():
    content = '''# Add your file and directory paths here
elegantLayout/
requirements.txt
'''
    with open('.zipbb', 'w') as file:
        file.write(content)
    print(".zipbb file created successfully.")

def main():
    parser = argparse.ArgumentParser(description='Parse .zipbb file, extract script and function data, and create graphs.')
    parser.add_argument('command', choices=['quickstart', 'zip', 'graph', 'function_graph'], help='Command to execute')
    parser.add_argument('-m', type=int, help='Maximum number of characters to parse from each script file.')
    args = parser.parse_args()

    zipbb_path = '.zipbb'
    if not os.path.exists(zipbb_path):
        print(f"{zipbb_path} not found.")
        return

    if args.command == 'quickstart':
        create_zipbb_file()
        return

    locations = read_zipbb_file(zipbb_path)
    all_files = get_all_files(locations)

    if args.command == 'zip':
        script_data, max_length = extract_script_data(all_files, args.m)
        output_json_path = 'scripts_data.json'
        write_json(script_data, output_json_path)
        
        # Create and save the script file graph
        G = create_graph(script_data, max_length)
        save_graph_to_json(G, 'graph_data.json')
        print(json.dumps(script_data, indent=4, ensure_ascii=False))
    
    elif args.command == 'graph':
        # Load the script file graph from the saved JSON and plot it
        G = load_graph_from_json('graph_data.json')
        plot_graph(G)

    elif args.command == 'function_graph':
        # Extract functions and their usage
        functions, function_usage = extract_function_data(all_files)
        
        # Create and save the function usage graph
        G = create_function_graph(functions, function_usage)
        save_function_graph_to_json(G, 'function_graph_data.json')
        
        # Plot the function usage graph
        plot_function_graph(G)

if __name__ == '__main__':
    main()
