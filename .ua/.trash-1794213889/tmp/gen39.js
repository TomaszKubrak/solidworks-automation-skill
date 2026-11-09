const fs=require("fs");
const ex=require("/Users/tomasz/Developer/solidworks-automation-skill/.ua/tmp/ua-file-extract-results-39.json").results;
const L={};for(const x of ex){L[x.path]={};for(const f of x.functions||[])L[x.path][f.name]=[f.startLine,f.endLine];for(const c of x.classes||[])L[x.path]["C:"+c.name]=[c.startLine,c.endLine];}
const P=(p)=>p;
const files=[
["scripts/validate_mcp.py","file","Skrypt walidacyjny uruchamiający serwer MCP przez sesję stdio i sprawdzający tryby full oraz search.","moderate",["validation","mcp","script","cli"]],
["scripts/validate_skill.py","file","Skrypt sprawdzający strukturę skilla: wymagane pliki, frontmatter SKILL.md, składnię Pythona i poprawność plików JSON.","moderate",["validation","script","cli","skill"]],
["setup.py","file","Konfiguracja pakietu setuptools z własną komendą PostInstallCommand uruchamianą po instalacji.","simple",["build-system","packaging","entry-point","install"]],
["subskills/autocad-automation/dotnet/CadStudio.AutoCAD2024/CadStudio.AutoCAD2024.csproj","config","Plik projektu .NET dla wtyczki CadStudio do AutoCAD 2024 z referencjami do zarządzanego API.","simple",["configuration","dotnet","autocad","build-system"]],
["subskills/autocad-automation/dotnet/CadStudio.AutoCAD2024/CadStudioCommands.cs","file","Wtyczka AutoCAD w C# rejestrująca komendy Probe i CreateGoldenDrawing, tworząca rysunek wzorcowy, plotująca model i zapisująca raport JSON.","complex",["autocad","dotnet","plugin","command-handler"]],
["subskills/autocad-automation/dotnet/CadStudio.AutoCAD2024/NuGet.Config","config","Konfiguracja źródeł NuGet dla projektu wtyczki AutoCAD.","simple",["configuration","nuget","dotnet"]],
["subskills/autocad-automation/evals/evals.json","config","Zestaw przypadków ewaluacyjnych dla subskilla autocad-automation.","simple",["evaluation","configuration","test-data","autocad"]],
["subskills/autocad-automation/examples/draw_mounting_plate.py","file","Przykład rysowania płyty montażowej w AutoCAD za pomocą skryptu Python.","simple",["example","autocad","cad-drawing","script"]],
["subskills/autocad-automation/scripts/acad_dotnet_preflight.py","file","Preflight dla ścieżki .NET AutoCAD: wykrywa zarządzane API, SDK, dowody uruchomień i historię runtime.","moderate",["preflight","autocad","dotnet","diagnostics"]],
["subskills/autocad-automation/scripts/acad_dotnet_regression.py","file","Uruchamia regresję wtyczki .NET w AutoCAD (accoreconsole), zbiera artefakty i zapisuje wynik z dowodami.","complex",["regression","autocad","dotnet","test-runner"]],
["subskills/autocad-automation/scripts/acad_headless.py","file","Bezgłowa inspekcja i renderowanie plików DXF z oceną inżynierską warstw, wymiarów, otworów i ramek.","complex",["headless","dxf","inspection","autocad"]],
["subskills/autocad-automation/scripts/acad_preflight.py","file","Preflight COM dla AutoCAD sprawdzający pywin32 oraz dostępność aplikacji AutoCAD.","moderate",["preflight","autocad","com","diagnostics"]],
["subskills/solidworks-engineering-drawing/schemas/drawing_spec.schema.json","config","Schemat JSON specyfikacji rysunku inżynierskiego (widoki, wymiary, notatki, BOM, tabliczka).","complex",["json-schema","schema-definition","drawing-spec","validation"]],
["subskills/solidworks-engineering-drawing/schemas/gdt_copy_spec.schema.json","config","Schemat JSON specyfikacji kopiowania adnotacji GD&T między rysunkami.","complex",["json-schema","gdt","schema-definition","validation"]],
["subskills/solidworks-engineering-drawing/scripts/__init__.py","file","Znacznik pakietu Pythona dla skryptów rysunku inżynierskiego.","simple",["package","entry-point","python"]],
["subskills/solidworks-engineering-drawing/scripts/drawing_review.py","file","Przegląd artefaktów rysunku: porównuje wymiary, otwory, BOM, tabliczkę, widoki, adnotacje i notatki z wymaganiami oraz wykrywa nakładanie się w PDF.","complex",["review","drawing","validation","quality-gate"]],
["subskills/solidworks-engineering-drawing/scripts/drawing_spec.py","file","Ładowanie i walidacja specyfikacji rysunku względem schematu JSON z zestawem reguł domenowych.","moderate",["validation","drawing-spec","schema","utility"]],
["subskills/solidworks-engineering-drawing/scripts/drawing_workflow.py","file","Główny workflow generowania rysunku SolidWorks: szablony, układ widoków, wymiary, notatki, BOM, znaczniki środka, eksport PDF i inspekcja struktury.","complex",["workflow","solidworks","drawing","orchestration"]],
["subskills/solidworks-engineering-drawing/scripts/drilling_panel_gdt.py","file","Analiza płyt wiertarskich: wykrywanie wzorców otworów, wnioskowanie baz, generowanie GD&T, tabeli otworów i specyfikacji rysunku.","complex",["gdt","hole-pattern","analysis","cli"]],
["subskills/solidworks-fillet-chamfer-cnc/agents/openai.yaml","config","Definicja interfejsu agenta OpenAI dla skilla fillet/chamfer CNC.","simple",["configuration","agent","openai"]],
["subskills/solidworks-fillet-chamfer-cnc/evals/evals.json","config","Przypadki ewaluacyjne dla skilla fillet/chamfer CNC.","simple",["evaluation","configuration","test-data","cnc"]],
["subskills/solidworks-fillet-chamfer-cnc/examples/cnc_mount_precision_params.json","config","Przykładowe parametry precyzyjnego uchwytu CNC do planowania promieni i fazek.","simple",["example","parameters","cnc","json"]],
["subskills/solidworks-fillet-chamfer-cnc/examples/open_source_corner_bracket_case.json","config","Przypadek referencyjny narożnego wspornika open source do walidacji strategii fillet/chamfer.","simple",["example","case-study","cnc","json"]],
["subskills/solidworks-fillet-chamfer-cnc/references/cnc-fillet-chamfer-lessons.md","document","Zbiór wniosków i zasad projektowych dla promieni i fazek w częściach obrabianych CNC.","moderate",["documentation","cnc","fillet-chamfer","lessons"]],
["subskills/solidworks-fillet-chamfer-cnc/scripts/cnc_strategy.py","file","Analiza parametrów uchwytu CNC i budowa planu operacji fillet/chamfer wraz z walidacją odstępów i nadpisań.","complex",["cnc","planning","validation","dataclass"]],
];
const T={file:"file",config:"config",document:"document"};
const nodes=[],edges=[];
const pre={file:"file",config:"config",document:"document"};
for(const [p,t,s,c,tags] of files)nodes.push({id:`${pre[t]}:${p}`,type:t,name:p.split("/").pop(),filePath:p,summary:s,tags,complexity:c});
const fn=[
["scripts/validate_mcp.py","_check_search","Sprawdza tryb search serwera MCP przez wywołania narzędzi w sesji.","complex"],
["scripts/validate_mcp.py","_with_session","Otwiera sesję stdio MCP i wykonuje przekazaną korutynę.","simple"],
["scripts/validate_skill.py","check_json_files","Weryfikuje poprawność wszystkich plików JSON w repozytorium skilla.","moderate"],
["scripts/validate_skill.py","main","Uruchamia wszystkie kontrole i zwraca kod wyjścia.","simple"],
["setup.py","C:PostInstallCommand","Komenda install uruchamiająca kroki poinstalacyjne.","moderate"],
["subskills/autocad-automation/dotnet/CadStudio.AutoCAD2024/CadStudioCommands.cs","C:CadStudioCommands","Klasa komend AutoCAD: Probe, CreateGoldenDrawing, plot i raportowanie.","complex"],
["subskills/autocad-automation/dotnet/CadStudio.AutoCAD2024/CadStudioCommands.cs","C:CadStudioExtension","Punkt wejścia rozszerzenia AutoCAD z Initialize i Terminate.","simple"],
["subskills/autocad-automation/scripts/acad_dotnet_preflight.py","run_preflight","Składa wyniki kontroli SDK i runtime w raport preflight.","complex"],
["subskills/autocad-automation/scripts/acad_dotnet_regression.py","run_regression","Wykonuje pełną regresję .NET w AutoCAD i utrwala wynik.","complex"],
["subskills/autocad-automation/scripts/acad_headless.py","inspect_dxf","Inspekcja DXF: warstwy, wymiary, otwory i ocena inżynierska.","complex"],
["subskills/autocad-automation/scripts/acad_headless.py","render_dxf","Renderuje DXF do obrazu do wizualnej kontroli.","moderate"],
["subskills/autocad-automation/scripts/acad_preflight.py","check_autocad","Sprawdza dostępność i stan aplikacji AutoCAD przez COM.","complex"],
["subskills/solidworks-engineering-drawing/scripts/drawing_review.py","review_drawing_artifacts","Zbiera raporty cząstkowe w końcowy przegląd rysunku.","complex"],
["subskills/solidworks-engineering-drawing/scripts/drawing_review.py","inspect_pdf_dimension_rendering","Ocenia renderowanie wymiarów w PDF i ich pola ograniczające.","complex"],
["subskills/solidworks-engineering-drawing/scripts/drawing_review.py","_professional_annotation_report","Raportuje adnotacje profesjonalne, w tym ramki GD&T.","complex"],
["subskills/solidworks-engineering-drawing/scripts/drawing_spec.py","validate_drawing_spec","Waliduje specyfikację rysunku i zwraca listę problemów.","complex"],
["subskills/solidworks-engineering-drawing/scripts/drawing_spec.py","load_drawing_spec","Wczytuje specyfikację rysunku z pliku JSON.","simple"],
["subskills/solidworks-engineering-drawing/scripts/drawing_workflow.py","generate_drawing_from_spec","Generuje rysunek SolidWorks na podstawie specyfikacji.","complex"],
["subskills/solidworks-engineering-drawing/scripts/drawing_workflow.py","generate_drawing_package","Wejście wysokiego poziomu generujące pakiet rysunkowy.","simple"],
["subskills/solidworks-engineering-drawing/scripts/drawing_workflow.py","inspect_drawing_structure","Inspekcja struktury rysunku: widoki, tabele, adnotacje.","complex"],
["subskills/solidworks-engineering-drawing/scripts/drawing_workflow.py","create_adaptive_standard_views","Tworzy standardowe widoki z adaptacyjnym układem.","complex"],
["subskills/solidworks-engineering-drawing/scripts/drawing_workflow.py","plan_standard_view_layout","Planuje układ widoków na arkuszu.","complex"],
["subskills/solidworks-engineering-drawing/scripts/drawing_workflow.py","auto_insert_center_marks","Automatycznie wstawia znaczniki środka.","complex"],
["subskills/solidworks-engineering-drawing/scripts/drawing_workflow.py","insert_dimensions","Wstawia wymiary do widoków rysunku.","complex"],
["subskills/solidworks-engineering-drawing/scripts/drawing_workflow.py","estimate_dimension_text_box","Szacuje pole tekstu wymiaru do kontroli kolizji.","complex"],
["subskills/solidworks-engineering-drawing/scripts/drawing_workflow.py","export_sheet_to_pdf","Eksportuje arkusz do PDF.","moderate"],
["subskills/solidworks-engineering-drawing/scripts/drilling_panel_gdt.py","analyze_drilling_panel","Analizuje płytę wiertarską: wzorce, bazy, GD&T, tabela.","complex"],
["subskills/solidworks-engineering-drawing/scripts/drilling_panel_gdt.py","detect_hole_patterns","Wykrywa wzorce otworów przez klasteryzację współrzędnych.","moderate"],
["subskills/solidworks-engineering-drawing/scripts/drilling_panel_gdt.py","build_drawing_spec","Buduje specyfikację rysunku z wyników analizy.","complex"],
["subskills/solidworks-engineering-drawing/scripts/drilling_panel_gdt.py","generate_gdt","Generuje ramki GD&T dla wzorców otworów.","moderate"],
["subskills/solidworks-engineering-drawing/scripts/drilling_panel_gdt.py","C:HolePattern","Model danych wzorca otworów.","simple"],
["subskills/solidworks-engineering-drawing/scripts/drilling_panel_gdt.py","C:Hole","Model danych pojedynczego otworu.","simple"],
["subskills/solidworks-fillet-chamfer-cnc/scripts/cnc_strategy.py","analyze_parameters","Waliduje parametry uchwytu i oblicza odstępy geometryczne.","complex"],
["subskills/solidworks-fillet-chamfer-cnc/scripts/cnc_strategy.py","build_operation_plan","Buduje uporządkowany plan operacji fillet/chamfer.","moderate"],
["subskills/solidworks-fillet-chamfer-cnc/scripts/cnc_strategy.py","C:MountParameters","Dataclass parametrów uchwytu CNC.","moderate"],
];
for(const [p,n,s,c] of fn){const cls=n.startsWith("C:");const name=n.replace("C:","");const lr=L[p][n];if(!lr)throw new Error(p+n);
const id=`${cls?"class":"function"}:${p}:${name}`;
nodes.push({id,type:cls?"class":"function",name,filePath:p,lineRange:lr,summary:s,tags:[cls?"class":"function","logic",p.includes("autocad")?"autocad":"solidworks"],complexity:c});
edges.push({source:`file:${p}`,target:id,type:"contains",direction:"forward",weight:1.0});
if(p.endsWith(".cs")||true){}
}
// fix source type for file nodes (all code files are file:)
const E=(s,t,ty,w)=>edges.push({source:s,target:t,type:ty,direction:"forward",weight:w});
E("config:subskills/autocad-automation/dotnet/CadStudio.AutoCAD2024/CadStudio.AutoCAD2024.csproj","file:subskills/autocad-automation/dotnet/CadStudio.AutoCAD2024/CadStudioCommands.cs","configures",0.6);
E("config:subskills/autocad-automation/dotnet/CadStudio.AutoCAD2024/NuGet.Config","config:subskills/autocad-automation/dotnet/CadStudio.AutoCAD2024/CadStudio.AutoCAD2024.csproj","configures",0.6);
E("config:subskills/solidworks-engineering-drawing/schemas/drawing_spec.schema.json","file:subskills/solidworks-engineering-drawing/scripts/drawing_spec.py","configures",0.6);
E("config:subskills/solidworks-engineering-drawing/schemas/drawing_spec.schema.json","file:subskills/solidworks-engineering-drawing/scripts/drawing_workflow.py","configures",0.6);
E("config:subskills/solidworks-fillet-chamfer-cnc/examples/cnc_mount_precision_params.json","file:subskills/solidworks-fillet-chamfer-cnc/scripts/cnc_strategy.py","related",0.5);
E("config:subskills/solidworks-fillet-chamfer-cnc/examples/open_source_corner_bracket_case.json","file:subskills/solidworks-fillet-chamfer-cnc/scripts/cnc_strategy.py","related",0.5);
E("document:subskills/solidworks-fillet-chamfer-cnc/references/cnc-fillet-chamfer-lessons.md","file:subskills/solidworks-fillet-chamfer-cnc/scripts/cnc_strategy.py","documents",0.5);
E("file:subskills/autocad-automation/examples/draw_mounting_plate.py","file:subskills/autocad-automation/scripts/acad_preflight.py","related",0.5);
E("file:subskills/autocad-automation/scripts/acad_dotnet_regression.py","file:subskills/autocad-automation/dotnet/CadStudio.AutoCAD2024/CadStudioCommands.cs","depends_on",0.6);
E("file:subskills/solidworks-engineering-drawing/scripts/drilling_panel_gdt.py","config:subskills/solidworks-engineering-drawing/schemas/drawing_spec.schema.json","depends_on",0.6);
E("file:subskills/solidworks-engineering-drawing/scripts/drawing_review.py","file:subskills/solidworks-engineering-drawing/scripts/drawing_workflow.py","related",0.5);
E("file:subskills/solidworks-engineering-drawing/scripts/drawing_review.py","file:scripts/sw_review.py","depends_on",0.6);
const out="/Users/tomasz/Developer/solidworks-automation-skill/.ua/intermediate/batch-39.json";
// drop edges to unknown non-batch? keep sw_review (neighborMap file)
fs.writeFileSync(out,JSON.stringify({nodes,edges},null,1));
console.log(nodes.length,edges.length,new Set(nodes.map(n=>n.id)).size);
