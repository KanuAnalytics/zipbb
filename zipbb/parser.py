import os
import json
import argparse

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
    for file_path in files:
        with open(file_path, 'r') as file:
            code = file.read(max_chars) if max_chars else file.read()
            script_data.append({
                'relative_path': os.path.relpath(file_path),
                'file_name': os.path.basename(file_path),
                'code': code
            })
    return script_data

def write_json(data, output_path='scripts_data.json'):
    with open(output_path, 'w') as json_file:
        json.dump(data, json_file, indent=4)

def create_zipbb_file():
    content = '''# Add your file and directory paths here 1 file or directory per line
# Comments start with a hash
# Example:
requirements.txt
'''
    with open('.zipbb', 'w') as file:
        file.write(content)
    print(".zipbb file created successfully.")

def main():
    parser = argparse.ArgumentParser(description='Parse .zipbb file and extract script data.')
    parser.add_argument('command', choices=['quickstart', 'zip'], help='Command to execute')
    parser.add_argument('-m', type=int, help='Maximum number of characters to parse from each script file.')
    args = parser.parse_args()

    if args.command == 'quickstart':
        create_zipbb_file()
        return

    zipbb_path = '.zipbb'
    if not os.path.exists(zipbb_path):
        print(f"{zipbb_path} not found.")
        return

    locations = read_zipbb_file(zipbb_path)
    all_files = get_all_files(locations)
    script_data = extract_script_data(all_files, args.m)
    
    output_json_path = 'scripts_data.json'
    write_json(script_data, output_json_path)
    
    print(json.dumps(script_data, indent=4))

if __name__ == '__main__':
    main()
