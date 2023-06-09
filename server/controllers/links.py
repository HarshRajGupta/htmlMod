from bs4 import BeautifulSoup
from urllib.parse import urlparse


def extract_links(path):
    try:
        file = open(path, encoding="utf8")
        html_content = file.read()
        soup = BeautifulSoup(html_content, 'html.parser')
        anchor_tags = soup.find_all('a')
        links_and_text = []
        for anchor in anchor_tags:
            href = anchor.get('href')
            result = urlparse(href)
            if result.scheme and result.netloc:
                text = anchor.get_text()
                text = text.strip()
                if href:
                    links_and_text.append([href, text])
        file.close()
        return links_and_text
    except:
        print("Error occured while loading links")
        return None


# print(extract_links("../templates/index.html"))
