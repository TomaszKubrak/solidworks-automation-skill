import json,math
inp=json.load(open('.ua/tmp/ua-file-analyzer-input-1.json'))
imp=inp['batchImportData']
res={r['path']:r for r in json.load(open('.ua/tmp/ua-file-extract-results-1.json'))['results']}
F={
'examples/01_basic_part.py':("Przykład podstawowy: łączy się z SolidWorks, tworzy prostą część (szkic + wyciągnięcie) i zapisuje ją z kontrolą jakości szkicu.",['example','part-modeling','entry-point','com-automation']),
'examples/02_complex_part.py':("Rozbudowany przykład tworzenia części z wieloma szkicami i operacjami (wyciągnięcia, otwory, zaokrąglenia) z użyciem sesji SolidWorks.",['example','part-modeling','entry-point','com-automation']),
'scripts/drawing_spec.py':("Krótki moduł ze specyfikacją rysunku używaną przez generator pakietu rysunkowego.",['drawing','specification','utility']),
'scripts/sw_connect.py':("Główna warstwa połączenia z SolidWorks przez COM: uruchamianie i podpinanie się do instancji, szablony, tworzenie, otwieranie i zapis dokumentów oraz bezpieczne odczyty członków COM.",['com-automation','connection','solidworks','document-management','utility']),
'scripts/sw_drawing_native.py':("Natywne tworzenie wymiarów i adnotacji na rysunkach SolidWorks wraz z walidacją żądań, mapowaniem widoków i weryfikacją wymiarów.",['drawing','dimensions','validation','com-automation']),
'scripts/sw_drawing_package.py':("Generuje pakiet rysunkowy (kopie plików, rysunki, nazwy) z użyciem sesji SolidWorks, ochrony odczytu i planu zmiany nazw; posiada punkt wejścia CLI.",['drawing','package-generation','cli','entry-point']),
'scripts/sw_file_rename.py':("Planuje i wykonuje zmianę nazw plików według szablonu pól, z walidacją nazw i zbieraniem wpisów; narzędzie CLI.",['file-rename','cli','planning','utility']),
'scripts/sw_gdt_annotation.py':("Wstawia bazy odniesienia i tolerancje GD&T (ramki, XML gtol) na rysunku SolidWorks oraz weryfikuje ich poprawność i pozycję.",['gdt','annotation','drawing','com-automation','validation']),
'scripts/sw_gdt_copy.py':("Tworzy adnotacje GD&T na kopii dokumentu: rozwiązuje cele, waliduje plan, wstawia adnotacje i weryfikuje je po ponownym otwarciu; posiada CLI.",['gdt','annotation','verification','cli','com-automation']),
'scripts/sw_part.py':("Rozbudowany moduł modelowania części: cache referencji szkiców, selekcja obiektów, prymitywy szkicu, automatyczne wymiarowanie oraz operacje bryłowe (wyciągnięcia, obrót, zaokrąglenia, szyki, żebra).",['part-modeling','sketch','features','com-automation','solidworks']),
'scripts/sw_read_guard.py':("Mała klasa ochrony odczytu, wskazująca że operacja SolidWorks nie może modyfikować dokumentu.",['guard','safety','read-only']),
'scripts/sw_rename_copy.py':("Kopiuje dokumenty SolidWorks pod nowymi nazwami z sumami SHA-256, migawkami i sprawdzonym otwarciem; punkt wejścia CLI.",['copy','rename','integrity','cli']),
'scripts/sw_session.py':("Menedżer kontekstu sesji SolidWorks (SolidWorksSession) zarządzający połączeniem i cyklem życia dokumentów.",['session','context-manager','com-automation','lifecycle']),
'scripts/sw_sketch_quality.py':("Inspekcja jakości szkiców i pełne zdefiniowanie szkicu oraz modeli, wspierające kontrolę jakości modelowania.",['sketch','quality','inspection','validation']),
}
S={ # file: [(name,kind,summary)]
'examples/01_basic_part.py':[('main','function','Tworzy prostą część, rysuje szkic, wyciąga bryłę i zapisuje plik.')],
'examples/02_complex_part.py':[('main','function','Buduje złożoną część w wielu krokach i zapisuje wynik.')],
'scripts/sw_connect.py':[
('SolidWorksConnectionError','class','Wyjątek zgłaszany przy błędach połączenia z SolidWorks.'),
('_LaunchGuard','class','Strażnik uruchomienia, śledzący proces SolidWorks uruchomiony przez skrypt.'),
('get_com_member','function','Odczytuje członka obiektu COM z obsługą różnych wariantów dostępu.'),
('normalize_doc_type','function','Normalizuje nazwę typu dokumentu (part, assembly, drawing).'),
('close_owned_solidworks','function','Zamyka instancję SolidWorks uruchomioną przez skrypt.'),
('connect_solidworks','function','Łączy się z działającym lub uruchamia nowy SolidWorks i czeka na gotowość.'),
('find_template','function','Wyszukuje szablon dokumentu odpowiedni dla typu.'),
('ensure_default_templates','function','Zapewnia dostępność domyślnych szablonów.'),
('snapshot_open_documents','function','Robi migawkę otwartych dokumentów.'),
('new_document','function','Tworzy nowy dokument z szablonu.'),
('open_document','function','Otwiera dokument z obsługą błędów i ostrzeżeń.'),
('save_document','function','Zapisuje dokument pod wskazaną ścieżką.')],
'scripts/sw_drawing_native.py':[
('validate_dimensions','function','Waliduje listę wymiarów do utworzenia.'),
('validate_native_requests','function','Waliduje żądania natywnych adnotacji.'),
('describe_target','function','Opisuje cel wymiaru (krawędź, szkic).'),
('target_matches','function','Sprawdza dopasowanie celu do opisu.'),
('map_views','function','Mapuje widoki rysunku.'),
('create_dimensions','function','Tworzy wymiary na widokach rysunku.'),
('verify_dimensions','function','Weryfikuje utworzone wymiary.')],
'scripts/sw_drawing_package.py':[
('generate_package','function','Generuje cały pakiet rysunkowy dla dokumentu.'),
('main','function','Punkt wejścia CLI generatora pakietu.')],
'scripts/sw_file_rename.py':[
('template_fields','function','Wyznacza pola szablonu nazwy pliku.'),
('plan_renames','function','Buduje plan zmian nazw z wykrywaniem konfliktów.'),
('collect_entries','function','Zbiera wpisy plików do zmiany nazw.'),
('main','function','Punkt wejścia CLI zmiany nazw.')],
'scripts/sw_gdt_annotation.py':[
('build_frame_xml','function','Buduje XML ramki tolerancji.'),
('build_gtol_xmls','function','Buduje XML-e gtol dla zestawu ramek.'),
('verify_gtol_xml','function','Weryfikuje XML gtol.'),
('insert_datum','function','Wstawia bazę odniesienia.'),
('insert_gtol','function','Wstawia tolerancję GD&T na rysunku.')],
'scripts/sw_gdt_copy.py':[
('inspect_targets','function','Inspekcja celów adnotacji.'),
('validate_plan','function','Waliduje plan adnotacji.'),
('resolve_target','function','Rozwiązuje cel adnotacji.'),
('create_annotations','function','Tworzy adnotacje według planu.'),
('annotate_copy','function','Adnotuje kopię dokumentu i weryfikuje po ponownym otwarciu.'),
('main','function','Punkt wejścia CLI.')],
'scripts/sw_part.py':[
('SketchSelectionRef','class','Referencja do zaznaczenia szkicu.'),
('_SketchCacheEntry','class','Wpis cache szkiców.'),
('clear_sketch_selection_cache','function','Czyści cache zaznaczeń szkiców.'),
('_ensure_sketch_selected','function','Zapewnia zaznaczenie szkicu przed operacją.'),
('start_sketch','function','Rozpoczyna szkic na płaszczyźnie.'),
('sketch','function','Menedżer kontekstu szkicu.'),
('auto_dimension_sketch','function','Automatycznie wymiaruje szkic.'),
('extrude_boss','function','Wyciągnięcie dodające materiał.'),
('extrude_cut','function','Wyciągnięcie usuwające materiał.'),
('extrude_midplane','function','Wyciągnięcie symetryczne.'),
('revolve_boss','function','Obrót dodający materiał.'),
('fillet','function','Zaokrąglenie krawędzi.'),
('chamfer','function','Fazowanie krawędzi.'),
('linear_pattern','function','Szyk liniowy.'),
('circular_pattern','function','Szyk kołowy.'),
('rib','function','Żebro.')],
'scripts/sw_read_guard.py':[('SolidWorksReadGuard','class','Klasa ochrony odczytu.')],
'scripts/sw_rename_copy.py':[
('prepare_plan','function','Przygotowuje plan kopiowania.'),
('copy_batch','function','Kopiuje partię dokumentów pod nowymi nazwami.'),
('main','function','Punkt wejścia CLI.')],
'scripts/sw_session.py':[
('SolidWorksSession','class','Sesja SolidWorks zarządzająca połączeniem i dokumentami.'),
('session','function','Fabryka kontekstu sesji.')],
'scripts/sw_sketch_quality.py':[
('inspect_sketch','function','Inspekcja stanu zdefiniowania szkicu.'),
('fully_define_sketch','function','Doprowadza szkic do pełnego zdefiniowania.'),
('inspect_model_sketches','function','Inspekcja wszystkich szkiców modelu.')]}
def cx(n): return 'simple' if n<50 else 'moderate' if n<=200 else 'complex'
parts_files=sorted(F)
nodes={};edges={}
for p in parts_files:
    r=res[p];s,t=F[p]
    nodes[p]=[{"id":"file:"+p,"type":"file","name":p.split('/')[-1],"filePath":p,"summary":s,"tags":t,"complexity":cx(r['nonEmptyLines'])}]
    edges[p]=[{"source":"file:"+p,"target":"file:"+x,"type":"imports","direction":"forward","weight":0.7} for x in imp.get(p,[])]
    fl={f['name']:f for f in r.get('functions',[])}; cl={c['name']:c for c in r.get('classes',[])}
    for name,kind,summ in S.get(p,[]):
        o=(cl if kind=='class' else fl)[name]
        id=f"{kind}:{p}:{name}"
        nodes[p].append({"id":id,"type":kind,"name":name,"filePath":p,"lineRange":[o['startLine'],o['endLine']],"summary":summ,"tags":[kind,'solidworks','automation'],"complexity":cx(o['endLine']-o['startLine']+1)})
        edges[p].append({"source":"file:"+p,"target":id,"type":"contains","direction":"forward","weight":1.0})
        edges[p].append({"source":"file:"+p,"target":id,"type":"exports","direction":"forward","weight":0.8})
N=sum(len(v) for v in nodes.values());E=sum(len(v) for v in edges.values())
k=1 if N<=60 and E<=120 else math.ceil(max(N/60,E/120))
print(N,E,k)
size=math.ceil(len(parts_files)/k)
for i in range(k):
    fs=parts_files[i*size:(i+1)*size]
    d={"nodes":[n for f in fs for n in nodes[f]],"edges":[e for f in fs for e in edges[f]]}
    fn='.ua/intermediate/batch-1.json' if k==1 else f'.ua/intermediate/batch-1-part-{i+1}.json'
    json.dump(d,open(fn,'w'),ensure_ascii=False,indent=1);print(fn,len(d['nodes']),len(d['edges']))
print(sum(len(v) for v in imp.values()))
