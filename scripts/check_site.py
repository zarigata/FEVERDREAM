#!/usr/bin/env python3
"""Check published HTML, crawl targets, metadata, translation pairs and assets."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json,xml.etree.ElementTree as ET
R=Path(__file__).resolve().parents[1]
class Page(HTMLParser):
 def __init__(self):super().__init__(convert_charrefs=True);self.tags=[];self.json=[];self.in_json=False;self.buffer=''
 def handle_starttag(self,t,a):
  a=dict(a);self.tags.append((t,a))
  if t=='script' and a.get('type')=='application/ld+json':self.in_json=True;self.buffer=''
 def handle_data(self,data):
  if self.in_json:self.buffer+=data
 def handle_endtag(self,t):
  if t=='script' and self.in_json:self.json.append(json.loads(self.buffer));self.in_json=False
 def find(self,t,**attrs):return [a for tag,a in self.tags if tag==t and all(a.get(k)==v for k,v in attrs.items())]
def resolve(path):
 p=R/unquote(path).lstrip('/');return p/'index.html' if path.endswith('/') else p
canonicals=set();pages={}
for lang in ['en','pt']:
 for f in (R/lang).rglob('index.html'):
  p=Page();p.feed(f.read_text());pages[f]=p
  assert len(p.find('h1'))==1,f'{f}: expected one h1'
  assert p.find('html',lang='en' if lang=='en' else 'pt-BR'),f
  canonical=p.find('link',rel='canonical');assert len(canonical)==1,f
  href=canonical[0]['href'];assert href not in canonicals,f'duplicate {href}';canonicals.add(href)
  assert resolve(urlsplit(href).path)==f,f'canonical mismatch: {f}'
  assert p.find('meta',name='description')[0]['content'],f
  assert p.find('meta',property='og:url')[0]['content']==href,f
  assert p.find('meta',name='twitter:card')[0]['content']=='summary_large_image',f
  assert len(p.json)==1 and len(p.json[0]['@graph'])>=3,f
  for code in ['en','pt-BR','x-default']:
   alt=p.find('link',rel='alternate',hreflang=code);assert len(alt)==1,f
   target=resolve(urlsplit(alt[0]['href']).path);assert target.is_file(),target
  for tag,a in p.tags:
   for key in ['href','src']:
    v=a.get(key,'')
    if v.startswith('/') and not v.startswith('//'):assert resolve(urlsplit(v).path).is_file(),f'{f}: broken {v}'
   if tag=='img':
    assert 'alt' in a and 'width' in a and 'height' in a,f
    asset=resolve(a['src']);assert asset.stat().st_size>100,f'empty asset: {asset}'
assert len(pages)==22,len(pages)
sitemap=ET.parse(R/'sitemap.xml');listed={x.text for x in sitemap.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')};assert listed==canonicals,'sitemap differs from published pages'
for lang in ['en','pt']:
 assert 'architecture' in (R/'en/projects/double-agent/index.html').read_text().lower()
 assert 'GPL-3.0-or-later' in (R/lang/'opensource/index.html').read_text()
 assert 'education.feverdream.pw' not in (R/lang/'index.html').read_text()
assert 'sitemap.xml' in (R/'robots.txt').read_text()
print('PASS: 22 canonical pages; unique H1s and canonicals; metadata; JSON-LD; bilingual alternates; local links and assets; sitemap coverage; project status and licenses.')
