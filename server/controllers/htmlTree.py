from bs4 import BeautifulSoup
import networkx as nx
import matplotlib.pyplot as plt
import io
import base64


def create_html_tree(path):
    try:
        file = open(path, encoding="utf8")
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
        image = f'''data:image/png;base64,{base64_image}'''
        file.close()
        return image
    except:
        print('Could not create tree')
        return None


# print(create_html_tree("../templates/index.html"))
