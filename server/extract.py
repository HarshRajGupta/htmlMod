from bs4 import BeautifulSoup
import networkx as nx
import matplotlib.pyplot as plt
import io
import base64


def extract_images():
    try:
        file = open("templates/index.html", encoding="utf8")
        html_content = file.read()
        soup = BeautifulSoup(html_content, 'html.parser')
        img_tags = soup.find_all('img')
        image_urls = []
        for img in img_tags:
            src = img.get('src')
            image = []
            if src:
                image.append(src)
                image.append(img.get('alt'))
            if len(image):
                image_urls.append(image)
        return image_urls
    except:
        print("Error occured while loading images")
        return None


def extract_links():
    try:
        file = open("templates/index.html", encoding="utf8")
        html_content = file.read()
        soup = BeautifulSoup(html_content, 'html.parser')
        anchor_tags = soup.find_all('a')
        links_and_text = []
        for anchor in anchor_tags:
            href = anchor.get('href')
            text = []
            for i in anchor.get_text().split('\n'):
                if i and i != '':
                    text.append(i)
            if href:
                links_and_text.append([href, text])
        return links_and_text
    except:
        print("Error occured while loading links")
        return None


def extract_text():
    try:
        file = open("templates/index.html", encoding="utf8")
        html_content = file.read()
        soup = BeautifulSoup(html_content, 'html.parser')
        text = soup.get_text()
        text_array = text.split('\n')
        new_text_array = []
        for line in text_array:
            new_line = []
            for i in line.split(' '):
                if i and i != '' and i != ' ':
                    new_line.append(i)
            if len(new_line):
                new_text_array.append(new_line)
        return new_text_array
    except:
        print("Error parsing text")
        return None


def extract_javascript():
    try:
        file = open("templates/index.html", encoding="utf8")
        html_content = file.read()
        soup = BeautifulSoup(html_content, 'html.parser')
        script_tags = soup.find_all('script')
        javascript_code = []
        for script in script_tags:
            if script.string:
                javascript_code.append(script.string.strip())
        return javascript_code
    except:
        print("Could not extract javascript")


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
