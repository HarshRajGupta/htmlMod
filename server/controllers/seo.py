from bs4 import BeautifulSoup
import nltk
from nltk.tokenize import word_tokenize
nltk.download('stopwords')
nltk.download('punkt')


def seo_analysis(path):
    try:
        file = open(path, encoding="utf8")
        html_content = file.read()
        soup = BeautifulSoup(html_content, 'html.parser')
        
        good = []
        bad = []
        
        title = soup.find('title').get_text()
        description = soup.find('meta', attrs={'name': 'description'})
        
        if title:
            good.append("Title Exists! Great!")
        else:
            bad.append("Title does not exist! Add a Title")
        if description:
            good.append("Description Exists! Great!")
        else:
            bad.append("Description does not exist! Add a Meta Description")
        
        hs = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
        h_tags = []
        for h in soup.find_all(hs):
            good.append(f"{h.name}-->{h.text.strip()}")
            h_tags.append(h.name)
        if 'h1' not in h_tags:
            bad.append("No H1 found!")
        for i in soup.find_all('img', alt=''):
            bad.append(f"No Alt: {i}")
        bod = soup.find('body').text
        words = [i.lower() for i in word_tokenize(bod)]
        sw = nltk.corpus.stopwords.words('english')
        new_words = []
        for i in words:
            if i not in sw and i.isalpha():
                new_words.append(i)
        freq = nltk.FreqDist(new_words)
        keywords = freq.most_common(10)
        return (keywords, good, bad)
    except:
        print("Failed to calculate seo")
        return None


# print(seo_analysis("../templates/index.html"))
