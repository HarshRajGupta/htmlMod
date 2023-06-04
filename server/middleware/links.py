from bs4 import BeautifulSoup


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


extract_links()
