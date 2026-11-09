const r=require("./ua-file-extract-results-40.json").results;
const L={};r.forEach(f=>{L[f.path]=Object.fromEntries((f.functions||[]).map(x=>[x.name,x.startLine+"-"+x.endLine]))});
const P="subskills/";
const C=P+"solidworks-fillet-chamfer-cnc/scripts/", N=C+"native/", T=P+"solidworks-threaded-holes/", V=P+"solidworks-vibecad/";
const nodes=[],edges=[];
const n=(id,type,path,summary,tags,cx,extra={})=>nodes.push({id,type,name:path.split("/").pop(),filePath:path,summary,tags,complexity:cx,...extra});
const fns=(path,list)=>{for(const [name,s,tags,cx] of list){const [a,b]=L[path][name].split("-").map(Number);
nodes.push({id:`function:${path}:${name}`,type:"function",name,filePath:path,lineRange:[a,b],summary:s,tags,complexity:cx||"simple"});
edges.push({source:`file:${path}`,target:`function:${path}:${name}`,type:"contains",direction:"forward",weight:1.0});}};
n("file:"+C+"create_cnc_mount_template.py","file",C+"create_cnc_mount_template.py","Skrypt CLI budujący w SolidWorks parametryczny uchwyt CNC (płyta, otwory, szczelina) z fazowaniem i zaokrągleniami krawędzi wybieranych predykatami geometrycznymi oraz zbierający dowody istnienia cech.",["cnc","solidworks","com-automation","entry-point","fillet-chamfer"],"complex");
fns(C+"create_cnc_mount_template.py",[
["cut","Wycina materiał z aktywnego szkicu z podanym typem zakończenia.",["feature","cut","solidworks"]],
["edge_signature","Wylicza sygnaturę geometryczną krawędzi (punkty, kierunek, promień) do jej jednoznacznej identyfikacji.",["topology","edge","geometry"],"moderate"],
["select_exact_edges","Zaznacza w modelu dokładnie te krawędzie, które pasują do zadanych sygnatur.",["selection","edge","solidworks"],"moderate"],
["vertical_corner_predicate","Predykat wybierający pionowe krawędzie narożników do zaokrąglenia.",["predicate","corner","topology"],"moderate"],
["hole_mouth_predicate","Predykat wybierający krawędzie wlotów otworów do fazowania.",["predicate","hole","topology"],"moderate"],
["operation_predicate","Dobiera predykat krawędzi dla wskazanej operacji obróbkowej.",["predicate","dispatch","cnc"],"moderate"],
["apply_treatment","Stosuje fillet lub chamfer na wybranych krawędziach i weryfikuje powstałą cechę.",["fillet","chamfer","feature"],"complex"],
["create_centered_slot","Tworzy wyśrodkowaną szczelinę jako szkic i wycięcie.",["slot","sketch","cut"],"moderate"],
["collect_feature_evidence","Zbiera dowody utrwalenia cech z drzewa FeatureManager.",["evidence","verification","feature-tree"],"moderate"],
["build_model","Główny przebieg budowy modelu uchwytu: płyta, otwory, szczelina, obróbki krawędzi i dowody.",["orchestration","model-build","cnc"],"complex"],
["parse_args","Parsuje argumenty wiersza poleceń skryptu.",["cli","argparse"]],
["main","Punkt wejścia: parametry, plan operacji i budowa modelu.",["entry-point","cli"]]]);
n("file:"+N+"HoldLineBridge.cs","file",N+"HoldLineBridge.cs","Most w C# wywołujący SolidWorks API do utworzenia fillet z linią podtrzymania (hold line), z wyszukiwaniem unikalnych ścian i krawędzi oraz wynikiem w JSON.",["csharp","com-interop","fillet","hold-line","bridge"],"complex","");
nodes[nodes.length-1].languageNotes="Aplikacja konsolowa C# korzystająca z interopu COM SolidWorks.";
nodes.push({id:"class:"+N+"HoldLineBridge.cs:HoldLineBridge",type:"class",name:"HoldLineBridge",filePath:N+"HoldLineBridge.cs",lineRange:[14,323],summary:"Klasa statyczna mostu: tworzy fillet z hold line i serializuje wynik do JSON.",tags:["bridge","fillet","solidworks"],complexity:"complex"});
edges.push({source:"file:"+N+"HoldLineBridge.cs",target:"class:"+N+"HoldLineBridge.cs:HoldLineBridge",type:"contains",direction:"forward",weight:1.0});
const HB=N+"HoldLineBridge.cs";L[HB]=Object.fromEntries(r.find(f=>f.path==HB).functions.map(x=>[x.name,x.startLine+"-"+x.endLine]));
fns(HB,[["CreateHoldLineFillet","Odnajduje ściany i krawędzie, buduje dane fillet z hold line i tworzy cechę.",["fillet","hold-line","solidworks"],"complex"],["FindUniqueFace","Znajduje jedyną ścianę spełniającą kryterium lub zgłasza błąd.",["topology","face","lookup"]],["FindUniqueEdge","Znajduje jedyną krawędź spełniającą kryterium lub zgłasza błąd.",["topology","edge","lookup"]],["ToJson","Serializuje wynik operacji do tekstu JSON.",["json","serialization"],"moderate"]]);
n("file:"+N+"NativeHoldLineAddin.cpp","file",N+"NativeHoldLineAddin.cpp","Natywny add-in C++ uruchamiający przygotowaną operację hold line z timera, odczytujący plik zadania i zapisujący wynik JSON.",["cpp","addin","native","hold-line","com"],"complex");
fns(N+"NativeHoldLineAddin.cpp",[["ReadResultPath","Odczytuje z pliku zadania ścieżkę pliku wyniku.",["file-io","parsing"],"moderate"],["JsonString","Escapuje ciąg znaków do literału JSON.",["json","escaping"],"moderate"],["PreparedHoldLineTimerProc","Procedura timera wykonująca przygotowaną operację hold line i zapisująca wynik.",["timer","callback","hold-line"],"moderate"]]);
n("file:"+N+"NativeHoldLineAddin.def","file",N+"NativeHoldLineAddin.def","Plik definicji eksportów DLL natywnego add-inu hold line.",["native","dll-exports","addin"],"simple");
n("file:"+N+"NativeHoldLineMacro.swb","file",N+"NativeHoldLineMacro.swb","Makro SolidWorks (VBA) uruchamiające natywny add-in hold line.",["macro","vba","solidworks","native"],"simple");
n("file:"+C+"verify_open_source_complex_case.py","file",C+"verify_open_source_complex_case.py","Skrypt weryfikacyjny pobierający przypięty model open source, sprawdzający złożoność topologii i wykonujący złożone fazowanie szerokość-szerokość w SolidWorks.",["verification","open-source","chamfer","solidworks","cli"],"complex");
fns(C+"verify_open_source_complex_case.py",[["fetch_pinned_source","Pobiera przypięty plik źródłowy i weryfikuje jego integralność.",["download","integrity","security"],"moderate"],["topology_counts","Liczy ściany, krawędzie i inne elementy topologii modelu.",["topology","metrics"],"moderate"],["edge_signature","Wylicza sygnaturę krawędzi do jej jednoznacznego wyboru.",["edge","geometry"],"moderate"],["apply_complex_width_width_chamfer","Wykonuje fazowanie szerokość-szerokość na złożonym zestawie krawędzi.",["chamfer","feature","solidworks"],"complex"],["run_solidworks_case","Uruchamia pełny przypadek w SolidWorks i zbiera dowody.",["orchestration","solidworks","verification"],"complex"],["main","Punkt wejścia CLI weryfikacji.",["entry-point","cli"]]]);
n("config:"+T+"agents/openai.yaml","config",T+"agents/openai.yaml","Konfiguracja interfejsu agenta dla podumiejętności gwintowanych otworów.",["configuration","agent","interface"],"simple");
n("document:"+T+"references/threaded-hole-lessons.md","document",T+"references/threaded-hole-lessons.md","Wnioski z testów gwintowanych otworów w SolidWorks: podstawy API, warunki zakończenia, walidacja parametrów i dowody trwałości cech.",["documentation","threaded-holes","lessons","solidworks"],"moderate");
n("document:"+T+"references/threaded-hole-roadmap.md","document",T+"references/threaded-hole-roadmap.md","Mapa drogowa rozszerzeń gwintowanych otworów z priorytetami P0-P2, w tym Hole Wizard i modyfikacja istniejących części.",["documentation","roadmap","threaded-holes"],"moderate");
n("file:"+T+"scripts/create_threaded_hole_template.py","file",T+"scripts/create_threaded_hole_template.py","Skrypt CLI tworzący blok z gwintowanym otworem w SolidWorks: rozwiązanie specyfikacji gwintu, otwór, fazka, gwint rzeczywisty lub kosmetyczny, spirala dowodowa i weryfikacja.",["threaded-hole","solidworks","cli","com-automation","verification"],"complex");
nodes.push({id:"class:"+T+"scripts/create_threaded_hole_template.py:ThreadedHoleParams",type:"class",name:"ThreadedHoleParams",filePath:T+"scripts/create_threaded_hole_template.py",lineRange:[75,94],summary:"Dataclass z parametrami gwintowanego otworu.",tags:["dataclass","parameters","thread"],complexity:"simple"});
edges.push({source:"file:"+T+"scripts/create_threaded_hole_template.py",target:"class:"+T+"scripts/create_threaded_hole_template.py:ThreadedHoleParams",type:"contains",direction:"forward",weight:1.0});
fns(T+"scripts/create_threaded_hole_template.py",[["normalize_thread_key","Normalizuje oznaczenie gwintu do klucza wyszukiwania.",["thread","normalization"],"moderate"],["resolve_thread_spec","Rozwiązuje specyfikację gwintu (średnica, skok, wiertło).",["thread","lookup"],"moderate"],["locate_hole_mouth_edge","Lokalizuje krawędź wlotu otworu w modelu.",["topology","edge","hole"],"moderate"],["add_real_thread_feature","Dodaje rzeczywistą cechę gwintu SolidWorks.",["thread","feature","solidworks"],"complex"],["add_cosmetic_thread_feature","Dodaje kosmetyczny gwint do otworu.",["thread","cosmetic","feature"],"moderate"],["add_visible_thread_helix","Rysuje widoczną spiralę gwintu jako dowód wizualny.",["helix","evidence","sketch"],"complex"],["build_params","Buduje i waliduje parametry otworu z argumentów.",["validation","parameters"],"complex"],["collect_thread_feature_evidence","Zbiera dowody utrwalenia cech gwintu.",["evidence","verification"],"moderate"],["create_threaded_hole_block","Główny przebieg tworzenia bloku z gwintowanym otworem.",["orchestration","model-build"],"complex"],["parse_args","Parsuje argumenty CLI.",["cli","argparse"],"moderate"],["main","Punkt wejścia skryptu.",["entry-point","cli"]]]);
n("config:"+V+"knowledge/manufacturing_rules.yaml","config",V+"knowledge/manufacturing_rules.yaml","Baza reguł produkcyjnych: wiertła pod gwinty, domyślne ustawienia CNC, kolejność cech i wymagania przeglądu.",["configuration","knowledge-base","manufacturing","cnc"],"moderate");
n("document:"+V+"prompts/solidworks_parametric_planner.md","document",V+"prompts/solidworks_parametric_planner.md","Prompt planisty parametrycznego: wejścia, wymagania wyjścia, zasady planowania i zakazy dla planu JSON.",["prompt","planning","documentation","vibecad"],"simple");
n("document:"+V+"references/vibecad-roadmap.md","document",V+"references/vibecad-roadmap.md","Mapa drogowa VibeCAD w czterech etapach: pętla planu, wykonawca SolidWorks, rozbudowa bazy wiedzy i interfejs.",["documentation","roadmap","vibecad"],"moderate");
n("config:"+V+"schemas/design_plan.schema.json","config",V+"schemas/design_plan.schema.json","Schemat JSON planu projektowego walidujący strukturę wyjścia planisty.",["schema","json-schema","validation","design-plan"],"moderate");
n("file:"+V+"scripts/plan_from_brief.py","file",V+"scripts/plan_from_brief.py","Generuje plan projektowy JSON z krótkiego opisu tekstowego: parsuje wymiary, gwinty, promienie i fazki.",["planning","parsing","cli","vibecad"],"complex");
fns(V+"scripts/plan_from_brief.py",[["parse_triplet_mm","Parsuje trójkę wymiarów w mm z tekstu.",["parsing","dimensions"]],["build_plan","Buduje pełny plan projektowy z opisu.",["planning","orchestration"],"complex"],["main","Punkt wejścia CLI.",["entry-point","cli"]]]);
n("file:"+V+"scripts/sw_execution_outline.py","file",V+"scripts/sw_execution_outline.py","Zamienia plan projektowy JSON na zarys wykonania w SolidWorks zapisany jako Markdown.",["planning","markdown-generation","cli","vibecad"],"moderate");
fns(V+"scripts/sw_execution_outline.py",[["build_outline","Buduje strukturę zarysu wykonania z planu.",["planning","outline"],"moderate"],["write_markdown","Zapisuje zarys jako plik Markdown.",["markdown","file-io"],"moderate"],["main","Punkt wejścia CLI.",["entry-point","cli"]]]);
const e=(s,t,ty,w)=>edges.push({source:s,target:t,type:ty,direction:"forward",weight:w});
e("file:"+C+"create_cnc_mount_template.py","file:"+C+"cnc_strategy.py","imports",0.7);
e("function:"+C+"create_cnc_mount_template.py:build_model","function:"+C+"cnc_strategy.py:build_operation_plan","calls",0.8);
e("document:"+V+"prompts/solidworks_parametric_planner.md","config:"+V+"schemas/design_plan.schema.json","related",0.5);
e("config:"+V+"schemas/design_plan.schema.json","file:"+V+"scripts/plan_from_brief.py","defines_schema",0.8);
e("config:"+V+"knowledge/manufacturing_rules.yaml","file:"+V+"scripts/plan_from_brief.py","configures",0.6);
e("file:"+V+"scripts/sw_execution_outline.py","config:"+V+"schemas/design_plan.schema.json","related",0.5);
e("document:"+T+"references/threaded-hole-lessons.md","file:"+T+"scripts/create_threaded_hole_template.py","documents",0.5);
e("document:"+T+"references/threaded-hole-roadmap.md","file:"+T+"scripts/create_threaded_hole_template.py","documents",0.5);
e("config:"+T+"agents/openai.yaml","file:"+T+"scripts/create_threaded_hole_template.py","configures",0.6);
e("document:"+V+"references/vibecad-roadmap.md","file:"+V+"scripts/plan_from_brief.py","documents",0.5);
e("file:"+N+"HoldLineBridge.cs","file:"+N+"NativeHoldLineAddin.cpp","related",0.5);
e("file:"+N+"NativeHoldLineMacro.swb","file:"+N+"NativeHoldLineAddin.cpp","depends_on",0.6);
e("file:"+N+"NativeHoldLineAddin.def","file:"+N+"NativeHoldLineAddin.cpp","configures",0.6);
require("fs").writeFileSync("/Users/tomasz/Developer/solidworks-automation-skill/.ua/intermediate/batch-40.json",JSON.stringify({nodes,edges},null,1));
console.log(nodes.length,edges.length);
