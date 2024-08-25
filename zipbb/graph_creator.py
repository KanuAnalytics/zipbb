import networkx as nx
import json
import os
import matplotlib.pyplot as plt

def create_graph(script_data, max_length):
    G = nx.DiGraph()
    
    for file_info in script_data:
        relative_path = file_info['relative_path']
        file_name = file_info['file_name']
        file_length = file_info['length']
        
        # Normalize the file length by the maximum length
        weight = file_length / max_length
        
        # Add a node with the weight
        G.add_node(relative_path, weight=weight)
        
        # Create edges representing directory structure
        parent_dir = os.path.dirname(relative_path)
        if parent_dir and parent_dir != '.':
            G.add_edge(parent_dir, relative_path)
            # Ensure the parent directory node exists with a default weight
            if not G.has_node(parent_dir):
                G.add_node(parent_dir, weight=0.0)
    
    return G

def save_graph_to_json(G, json_file_path):
    data = nx.readwrite.json_graph.node_link_data(G)
    with open(json_file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4)

def load_graph_from_json(json_file_path):
    with open(json_file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    G = nx.readwrite.json_graph.node_link_graph(data)
    return G

def plot_graph(G):
    pos = nx.spring_layout(G)
    # Assign default weight if missing
    node_sizes = [(G.nodes[node].get('weight', 0.0)) * 1000 for node in G.nodes]
    nx.draw(G, pos, with_labels=True, node_size=node_sizes, node_color='lightblue', font_size=8, font_weight='bold', edge_color='gray')
    # Save plot to file
    plt.savefig('complexity_graph.png', format='PNG')
    plt.show()
