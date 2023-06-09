from bs4 import BeautifulSoup


def extract_javascript(path):
    try:
        file = open(path, encoding="utf8")
        html_content = file.read()
        soup = BeautifulSoup(html_content, 'html.parser')
        script_tags = soup.find_all('script')
        javascript_code = []
        for script in script_tags:
            if script.string:
                javascript_code.append(script.string.strip())
        file.close()
        return javascript_code
    except:
        print("Could not extract javascript")


# print(extract_javascript("../templates/index.html"))
