from bs4 import BeautifulSoup


def extract_text(path):
    try:
        file = open(path, encoding="utf8")
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
        file.close()
        return new_text_array
    except:
        print("Error parsing text")
        return None


# print(extract_text("../templates/index.html"))
