from bs4 import BeautifulSoup
import networkx as nx
import matplotlib.pyplot as plt
import io
import base64


def create_html_tree():
    try:
        file = open("templates/index.html", encoding="utf8")
        html_content = file.read()
        soup = BeautifulSoup(html_content, 'html.parser')
        G = nx.DiGraph()

        def traverse(element, parent):
            tag = element.name
            G.add_node(tag)

            if parent:
                G.add_edge(parent, tag)

            for child in element.children:
                if child.name:
                    traverse(child, tag)

        root_element = soup.find()
        traverse(root_element, None)
        pos = nx.spring_layout(G)
        plt.figure(figsize=(12, 8))
        nx.draw(G, pos, with_labels=True, node_color='lightblue',
                edge_color='gray', font_size=8, node_size=2000)
        buffer = io.BytesIO()
        plt.savefig(buffer, format='png')
        buffer.seek(0)
        image_data = buffer.getvalue()
        buffer.close()
        base64_image = base64.b64encode(image_data).decode('utf-8')
        image = f'''"data:image/png;base64,{base64_image}"'''
        return image
    except:
        print('Could not create tree')
        return None


html_tree = create_html_tree()

html_page = f'''
<!DOCTYPE html>
<html>
<head>
    <title>HTML Tree Visualization</title>
</head>
<body>
    <h1>HTML Tree Visualization</h1>
    <img src="" alt="HTML Tree">
</body>
</html>
'''

file = open("templates/example.html", 'w', encoding="utf8")
file.write(html_page)

print(f"HTML tree visualization saved.")
