import ast
import networkx as nx
import json
import matplotlib.pyplot as plt

def extract_function_data(files):
    functions = {}
    function_usage = {}
    
    for file_path in files:
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()
                tree = ast.parse(content, filename=file_path)
                
                # Extract all function definitions
                for node in ast.walk(tree):
                    if isinstance(node, ast.FunctionDef):
                        func_name = node.name
                        functions[func_name] = {
                            'defined_in': file_path,
                            'calls': []
                        }
                
                # Track calls to functions, including those imported
                for node in ast.walk(tree):
                    if isinstance(node, ast.Call):
                        func_name = None
                        
                        # If the function is a simple call (e.g., function_name())
                        if isinstance(node.func, ast.Name):
                            func_name = node.func.id
                        
                        # If the function is an attribute call (e.g., module.function_name())
                        elif isinstance(node.func, ast.Attribute):
                            func_name = node.func.attr
                        
                        if func_name:
                            if func_name not in functions:
                                # Consider it an imported or external function
                                functions[func_name] = {
                                    'defined_in': "imported_or_external",
                                    'calls': []
                                }
                            functions[func_name]['calls'].append(file_path)
                            function_usage[func_name] = function_usage.get(func_name, 0) + 1
                        
        except (IOError, UnicodeDecodeError) as e:
            print(f"Skipping file {file_path}: {e}")
        except Exception as e:
            print(f"An unexpected error occurred while parsing {file_path}: {e}")
    
    return functions, function_usage

def create_function_graph(functions, function_usage):
    G = nx.DiGraph()
    
    for func_name, func_info in functions.items():
        file_path = func_info['defined_in']
        usage_count = function_usage.get(func_name, 0)
        
        # Add a node with the usage count as the weight
        G.add_node(func_name, weight=usage_count, defined_in=file_path)
        
        # Create edges representing function calls
        for caller in func_info['calls']:
            G.add_edge(caller, func_name)
    
    return G

def save_function_graph_to_json(G, json_file_path):
    data = nx.readwrite.json_graph.node_link_data(G)
    with open(json_file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4)

def load_function_graph_from_json(json_file_path):
    with open(json_file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    G = nx.readwrite.json_graph.node_link_graph(data)
    return G

def plot_function_graph(G):
    pos = nx.spring_layout(G)
    node_sizes = [(G.nodes[node].get('weight', 0.0)) * 1000 for node in G.nodes]
    nx.draw(G, pos, with_labels=True, node_size=node_sizes, node_color='lightgreen', font_size=8, font_weight='bold', edge_color='blue')
    # Save plot to file
    plt.savefig('function_graph.png', format='PNG')
    plt.show()
    
    