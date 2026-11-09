import json
F={}
def f(p,s,tags,c): F[p]=(s,tags,c)
f("design_spec","Walidacja i ładowanie specyfikacji projektowej (DesignSpec), konwersja jednostek do mm oraz porównanie wyników weryfikacji ze specyfikacją.",["walidacja","specyfikacja","jednostki","cad"],"complex")
f("dfm_profiles","Walidacja, bezpieczne ładowanie i scalanie profili procesów DFM bez możliwości luzowania obowiązujących ograniczeń produkcyjnych.",["dfm","profile","walidacja","produkcja"],"complex")
f("dfm_review","Lekki przegląd reguł DFM dla NeutralCadDocument: kontrole obróbki, blach, lasera, druku 3D i wtrysku; raport zawsze wymaga przeglądu inżyniera.",["dfm","przeglad-regul","raport","cli","produkcja"],"complex")
f("drive_sizing","Weryfikacja doboru silnika i reduktora względem profilu ruchu mechanizmu: moment, siła statyczna i ocena zapasu.",["napedy","obliczenia","walidacja","cli"],"complex")
f("dxf_preview_scene","Tylko-do-odczytu konwerter DXF do bezpiecznego JSON PreviewScene dla przeglądarki, z białą listą encji i rejestrem ograniczeń.",["dxf","konwerter","podglad","bezpieczenstwo"],"moderate")
f("fastener_audit","Audyt połączeń śrubowych 3D: poprawność otworów pogłębianych, mieszczenie łba, orientacja i prześwity między częściami.",["elementy-zlaczne","audyt","geometria","cad"],"complex")
f("fea_analysis","Walidacja danych MES, wykrywanie solvera CalculiX, generowanie białej listy pliku wejściowego, kontrolowane uruchomienie i parsowanie wyników.",["fea","calculix","solver","walidacja","cli"],"complex")
f("fea_convergence","Wykonuje wielosiatkowe badanie zbieżności CalculiX i zbiera dowody zbieżności wyników.",["fea","zbieznosc","dowody","calculix"],"moderate")
f("headless_cad_writer","Zapis otwartych formatów bez oprogramowania CAD (STL, OBJ, DXF, SVG, PDF, PNG) z dokumentów cadstudio.json oraz delegacja do usługi OCCT.",["headless","eksport","formaty","cli","cad"],"complex")
f("headless_occt_service","Izolowana usługa OCCT/OCP budująca B-Rep, wykonująca booleany i eksportująca STEP/IGES/BREP/STL/OBJ/GLB z wynikiem w JSON.",["occt","brep","eksport","headless","cli"],"complex")
f("http_boundary","Wspólne granice HTTPS: walidacja URL, blokada przekierowań i limit rozmiaru odpowiedzi dla pobierania z ustalonych źródeł.",["http","bezpieczenstwo","walidacja","utility"],"simple")
f("local_api_evidence","Odczyt lokalnej pomocy API i trwałych fragmentów publicznej dokumentacji jako dowodów, bez zapisu danych zadań.",["api","dokumentacja","dowody","cache"],"moderate")
f("parallel_api_lookup","Anonimowy adapter Parallel MCP jako ograniczone źródło zapasowe publicznych stron API SolidWorks.",["api","mcp","adapter","async"],"simple")
f("release_check","Statyczna bramka spójności przed wydaniem wykrywająca dryf dołączonych skillów.",["wydanie","ci","walidacja","cli"],"simple")
f("routing_review","Walidacja neutralnych tras Routing (końcówki, segmenty, długości, promienie gięcia) oraz sondowanie SolidWorks 2026.",["routing","walidacja","raport","solidworks","cli"],"complex")
f("stability_regression","Symulowana regresja stabilności cyklu życia połączenia CAD (20 połączeń, anulowanie, wyjście) bez uruchamiania prawdziwego CAD.",["test","regresja","stabilnosc","ci"],"simple")
f("standard_parts_geometry","Czyste funkcje geometrii części znormalizowanych: koło zębate walcowe, sprężyna ściskana i koło łańcuchowe.",["geometria","czesci-znormalizowane","matematyka","model-danych"],"complex")
f("sw_addin_host","Tylko-do-odczytu sondowanie wdrożenia i stanu uruchomieniowego hosta add-inu C# SolidWorks.",["solidworks","addin","sondowanie","cli"],"moderate")
f("sw_api_lookup","Tylko-do-odczytu weryfikacja biblioteki typów i opcjonalnej oficjalnej dokumentacji API dla wskazanej wersji SolidWorks, z trybem offline.",["api","solidworks","dokumentacja","cli","walidacja"],"complex")
f("sw_appearance","Narzędzia wyglądu i materiałów SolidWorks dla dokumentów, cech i komponentów wraz z weryfikacją ustawień.",["solidworks","wyglad","com","material"],"moderate")
f("sw_assembly","Narzędzia operacji na złożeniach SolidWorks: komponenty, mapowanie encji, mates, transformacje, DOF i detekcja interferencji przez COM.",["solidworks","zlozenia","com","mates","utility"],"complex")
f("sw_assembly_rename","Kopiowanie złożenia ze zmianą nazw: plan, domknięcie grafu referencji i kontrolowane wykonanie.",["solidworks","zlozenia","zmiana-nazw","cli"],"complex")
f("sw_capability_probe","Sondowanie lokalnej biblioteki typów SolidWorks i zaawansowanych możliwości mechanicznych bez modyfikacji dokumentów.",["solidworks","sondowanie","mozliwosci","cli"],"moderate")
f("sw_delivery","Dostawa BOM i Pack and Go: zbieranie BOM, eksport CSV, ślad BOM, macierz audytu oraz Pack and Go przez COM lub worker comtypes.",["solidworks","bom","pack-and-go","dostawa","com"],"complex")
f("sw_delivery_comtypes_worker","Podproces workera comtypes dla Pack and Go: wczytuje JSON ze stdin i zwraca jednolinijkowy wynik JSON, izolując stan COM.",["solidworks","worker","comtypes","subprocess","entry-point"],"simple")
nodes=[];edges=[]
import subprocess
R=json.load(open(".ua/tmp/ua-file-extract-results-37.json"))["results"]
def add(**k):nodes.append(k)
sig=lambda n,l,e:False
for r in R:
    p=r["path"];key=p.split("/")[1][:-3];s,t,c=F[key]
    fid="file:"+p
    add(id=fid,type="file",name=p.split("/")[1],filePath=p,summary=s,tags=t[:5],complexity=c)
    for fn in r.get("functions",[]):
        n=fn["name"];ln=fn["endLine"]-fn["startLine"]+1
        if n.startswith("_") and ln<40: continue
        if ln<10 and n.startswith("_"): continue
        if ln<10: continue
        i=f"function:{p}:{n}"
        add(id=i,type="function",name=n,filePath=p,lineRange=[fn["startLine"],fn["endLine"]],summary=f"Funkcja {n} w module {key}: {s.split(':')[0].split('.')[0][:90]}.",tags=["funkcja",key.replace("_","-"),"logika"],complexity="complex" if ln>100 else "moderate" if ln>30 else "simple")
        edges.append(dict(source=fid,target=i,type="contains",direction="forward",weight=1.0))
    for cl in r.get("classes",[]):
        n=cl["name"];ln=cl["endLine"]-cl["startLine"]+1
        if len(cl["methods"])<2 and ln<20 and not (not n.startswith("_")): continue
        i=f"class:{p}:{n}"
        add(id=i,type="class",name=n,filePath=p,lineRange=[cl["startLine"],cl["endLine"]],summary=f"Klasa {n} używana w module {key}.",tags=["klasa",key.replace("_","-"),"model"],complexity="simple" if ln<40 else "moderate")
        edges.append(dict(source=fid,target=i,type="contains",direction="forward",weight=1.0))
for a,b in [("dfm_review","dfm_profiles"),("fea_convergence","fea_analysis"),("local_api_evidence","parallel_api_lookup"),("sw_api_lookup","local_api_evidence"),("sw_api_lookup","parallel_api_lookup"),("sw_assembly_rename","sw_assembly"),("sw_delivery_comtypes_worker","sw_delivery"),("sw_delivery","sw_delivery_comtypes_worker"),("headless_cad_writer","headless_occt_service")]:
    edges.append(dict(source=f"file:scripts/{a}.py",target=f"file:scripts/{b}.py",type="depends_on",direction="forward",weight=0.6))
ids=[n["id"] for n in nodes];assert len(ids)==len(set(ids))
parts=-(-max(len(nodes)/60,len(edges)/120)//1)
print(len(nodes),len(edges),parts)
if len(nodes)<=60 and len(edges)<=120:
    json.dump({"nodes":nodes,"edges":edges},open(".ua/intermediate/batch-37.json","w"),ensure_ascii=False)
else:
    import math
    k=int(parts);files=sorted(F);per=math.ceil(len(files)/k)
    for j in range(k):
        fs={f"scripts/{x}.py" for x in files[j*per:(j+1)*per]}
        ns=[n for n in nodes if n["filePath"] in fs];nid={n["id"] for n in ns}
        es=[e for e in edges if e["source"] in nid]
        json.dump({"nodes":ns,"edges":es},open(f".ua/intermediate/batch-37-part-{j+1}.json","w"),ensure_ascii=False)
