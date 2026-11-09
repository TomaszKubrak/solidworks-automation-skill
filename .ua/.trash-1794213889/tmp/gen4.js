const fs=require("fs");
const inp=JSON.parse(fs.readFileSync(".ua/tmp/ua-file-analyzer-input-4.json"));
const ext=JSON.parse(fs.readFileSync(".ua/tmp/ua-file-extract-results-4.json"));
const L={};for(const f of ext.results){L[f.path]={};for(const x of (f.functions||[]))L[f.path][x.name]=[x.startLine,x.endLine];for(const x of (f.classes||[]))L[f.path][x.name]=[x.startLine,x.endLine];}
const nodes=[],edges=[];
const files={
"mcp-server/approval.py":["Księga zatwierdzeń (ApprovalLedger) przechowująca podpisane, ograniczone czasowo zgody na operacje zapisu CAD, z blokadą pliku i weryfikacją ścieżek.",["approval","security","ledger","persistence"],"complex"],
"mcp-server/artifact_access.py":["Warstwa dostępu do artefaktów generowanych przez narzędzia, oparta na księdze artefaktów aplikacji desktopowej; kontroluje odczyt plików w dozwolonych katalogach.",["artifact","access-control","service","ledger"],"moderate"],
"mcp-server/discovery.py":["Katalog narzędzi MCP (ToolCatalog) umożliwiający wyszukiwanie i opisywanie narzędzi po nazwie, metadanych i klasyfikacji odczyt/zapis.",["discovery","catalog","search","mcp"],"moderate"],
"mcp-server/document_identity.py":["Wiąże sesję z tożsamością aktywnego dokumentu (ścieżka, PID) i weryfikuje ją przed operacjami, aby zapobiec edycji niewłaściwego modelu.",["document-identity","validation","safety","mcp"],"simple"],
"mcp-server/gate.py":["Bramka ToolGate łącząca politykę, zatwierdzenia, tożsamość dokumentu i katalog narzędzi, decydująca czy wywołanie narzędzia jest dozwolone.",["gate","policy-enforcement","security","middleware"],"complex"],
"mcp-server/policy.py":["Klasyfikuje narzędzia według efektu (odczyt/zapis/niszczące), wylicza cele i skrót kanoniczny wywołania oraz decyduje o wymaganiu zatwierdzenia.",["policy","classification","security","hashing"],"moderate"],
"mcp-server/server.py":["Główny serwer FastMCP rejestrujący dziesiątki narzędzi SolidWorks i CAD Studio (modelowanie, złożenia, rysunki, FEA, eksport), z modelami wejściowymi Pydantic, blokadą COM i bramką zatwierdzeń.",["entry-point","mcp-server","api-handler","solidworks","com-automation"],"complex"],
"scripts/sw_native_wire.py":["Podłącza natywne narzędzia (build/import/replace/delete) do serwera MCP wraz z modelami wejściowymi Pydantic i funkcją invoke_native.",["native-bridge","mcp-tools","data-model","wiring"],"moderate"],
"scripts/sw_preflight.py":["Kontrole wstępne środowiska: wykrywa brakujące zależności COM (pywin32), proponuje instalację oraz sprawdza obecność SolidWorks.",["preflight","environment","cli","dependency-check"],"moderate"]};
for(const [p,[s,t,c]] of Object.entries(files)){nodes.push({id:"file:"+p,type:"file",name:p.split("/").pop(),filePath:p,summary:s,tags:t,complexity:c,languageNotes:"Python z adnotacjami typów."});}
const fn=(p,n,s,t,c="simple",type="function")=>{nodes.push({id:`${type}:${p}:${n}`,type,name:n,filePath:p,lineRange:L[p][n],summary:s,tags:t,complexity:c});edges.push({source:"file:"+p,target:`${type}:${p}:${n}`,type:"contains",direction:"forward",weight:1.0});};
const cl=(p,n,s,t,c)=>fn(p,n,s,t,c,"class");
let p="mcp-server/approval.py";
fn(p,"default_root","Zwraca domyślny katalog główny przechowywania zatwierdzeń.",["utility","path","config"]);
cl(p,"ApprovalError","Wyjątek zgłaszany przy nieprawidłowej lub wygasłej zgodzie.",["error","exception","approval"]);
cl(p,"ApprovalLedger","Trwała księga zatwierdzeń: wystawia, weryfikuje i zużywa podpisane zgody powiązane ze skrótem wywołania.",["ledger","approval","persistence"],"complex");
p="mcp-server/artifact_access.py";
cl(p,"ArtifactAccess","Udostępnia kontrolowany odczyt artefaktów z weryfikacją względem księgi artefaktów.",["artifact","access-control","service"],"moderate");
p="mcp-server/discovery.py";
cl(p,"ToolCatalog","Indeks metadanych narzędzi z wyszukiwaniem i opisem na żądanie.",["catalog","search","discovery"],"moderate");
p="mcp-server/document_identity.py";
cl(p,"DocumentIdentityError","Wyjątek niezgodności tożsamości dokumentu.",["error","exception","document-identity"]);
cl(p,"DocumentIdentity","Niezmienna tożsamość dokumentu (ścieżka, PID) z porównaniem.",["data-model","document-identity","validation"]);
fn(p,"bind_document","Wiąże aktywny dokument z bieżącą sesją.",["binding","document-identity"]);
fn(p,"verify_bound_document","Sprawdza, czy aktywny dokument pasuje do powiązanego.",["verification","document-identity"]);
fn(p,"has_bound_document","Informuje czy dokument jest już powiązany.",["predicate","document-identity"]);
p="mcp-server/gate.py";
cl(p,"ToolGate","Centralna bramka autoryzacji wywołań narzędzi: polityka, zgoda, tożsamość dokumentu.",["gate","security","policy-enforcement"],"complex");
fn(p,"allowed_reason","Buduje uzasadnienie dopuszczenia wywołania narzędzia.",["policy","reason","utility"]);
p="mcp-server/policy.py";
cl(p,"Effect","Enum efektów narzędzia (odczyt, zapis, niszczący).",["enum","policy","classification"]);
fn(p,"classify","Klasyfikuje narzędzie do kategorii efektu.",["classification","policy"]);
fn(p,"targets","Wyodrębnia cele (ścieżki/dokumenty) z argumentów wywołania.",["targets","parsing","policy"]);
fn(p,"canonical_digest","Liczy kanoniczny skrót wywołania do powiązania z zatwierdzeniem.",["hashing","canonical","approval"]);
fn(p,"summarize","Tworzy zwięzłe podsumowanie wywołania dla użytkownika.",["summary","policy"]);
p="mcp-server/server.py";
fn(p,"_load_automation_modules","Leniwie ładuje moduły automatyzacji SolidWorks i CAD Studio oraz zwraca je jako zestaw.",["loader","lazy-import","automation"],"complex");
fn(p,"_run_locked","Wykonuje operację COM pod blokadą z obsługą błędów i śledzeniem przez rdzeń wykonania.",["concurrency","com","execution"],"moderate");
fn(p,"_tool_error","Zamienia wyjątki w ustrukturyzowaną odpowiedź błędu narzędzia.",["error-handling","mcp"],"moderate");
fn(p,"_result","Formatuje wynik narzędzia (JSON lub Markdown).",["formatting","response"]);
cl(p,"BaseInput","Bazowy model wejściowy Pydantic dla narzędzi.",["pydantic","data-model","input"]);
cl(p,"ResponseFormat","Enum formatu odpowiedzi (markdown/json).",["enum","format"]);
fn(p,"solidworks_connect","Narzędzie łączące się z działającą instancją SolidWorks przez COM.",["tool","solidworks","connection"],"moderate");
fn(p,"solidworks_health_check","Narzędzie diagnostyczne stanu SolidWorks i połączenia.",["tool","diagnostics","solidworks"],"moderate");
fn(p,"solidworks_recover","Narzędzie odzyskiwania po zawieszeniu lub blokadzie SolidWorks.",["tool","recovery","solidworks"],"moderate");
fn(p,"solidworks_sketch_and_extrude","Narzędzie tworzące szkic na płaszczyźnie i wyciągnięcie.",["tool","modeling","feature"],"moderate");
fn(p,"solidworks_generate_drawing","Narzędzie generujące rysunek z modelu.",["tool","drawing","solidworks"]);
fn(p,"solidworks_review_drawing","Narzędzie przeglądu rysunku (wymiary, tolerancje, GD&T).",["tool","drawing","review"],"moderate");
fn(p,"solidworks_export_active","Narzędzie eksportu aktywnego dokumentu do wybranego formatu.",["tool","export","solidworks"]);
fn(p,"cadstudio_run_fea","Narzędzie uruchamiające analizę MES w CAD Studio.",["tool","fea","cadstudio"]);
fn(p,"cadstudio_read_artifact","Narzędzie odczytu artefaktu przez kontrolę dostępu.",["tool","artifact","cadstudio"],"moderate");
fn(p,"sw_search_tools","Meta-narzędzie wyszukiwania narzędzi w katalogu.",["meta-tool","discovery","search"]);
fn(p,"sw_describe_tool","Meta-narzędzie opisujące schemat wybranego narzędzia.",["meta-tool","discovery","schema"]);
fn(p,"sw_call_tool","Meta-narzędzie wywołujące inne narzędzie przez bramkę ToolGate.",["meta-tool","gate","dispatch"],"moderate");
fn(p,"main","Punkt wejścia uruchamiający serwer MCP (preflight, rejestracja, transport).",["entry-point","startup","mcp"],"moderate");
p="scripts/sw_native_wire.py";
fn(p,"invoke_native","Wywołuje natywne narzędzie hosta i normalizuje wynik.",["bridge","native","invoke"]);
fn(p,"register_tools","Rejestruje natywne narzędzia build/import/replace/delete w aplikacji MCP.",["registration","mcp-tools","wiring"],"moderate");
cl(p,"BuildSpec","Model specyfikacji budowy geometrii (sweep, box).",["data-model","pydantic","spec"]);
p="scripts/sw_preflight.py";
fn(p,"ensure_com_dependencies","Zapewnia zależności COM, w razie potrzeby pytając o zgodę na instalację.",["dependency","install","preflight"],"moderate");
fn(p,"run_preflight","Uruchamia pełną kontrolę wstępną środowiska.",["preflight","orchestration"]);
fn(p,"solidworks_installed","Sprawdza obecność instalacji SolidWorks.",["detection","solidworks"]);
fn(p,"main","Punkt wejścia CLI preflight.",["entry-point","cli"]);
cl(p,"PreflightResult","Wynik kontroli wstępnej.",["data-model","result"]);
// imports
let n=0;for(const [f,arr] of Object.entries(inp.batchImportData)){for(const t of arr){edges.push({source:"file:"+f,target:"file:"+t,type:"imports",direction:"forward",weight:0.7});n++;}}
console.log("imports",n);
const c=(s,t)=>edges.push({source:s,target:t,type:"calls",direction:"forward",weight:0.8});
c("function:mcp-server/server.py:_run_locked","function:scripts/core/execution.py:execute_with_core");
c("class:mcp-server/artifact_access.py:ArtifactAccess","function:apps/desktop/cad_workbench/artifact_ledger.py:build_artifact_ledger");
c("class:mcp-server/gate.py:ToolGate","class:mcp-server/approval.py:ApprovalLedger");
c("class:mcp-server/gate.py:ToolGate","function:mcp-server/policy.py:classify");
c("class:mcp-server/gate.py:ToolGate","class:mcp-server/discovery.py:ToolCatalog");
c("function:mcp-server/server.py:sw_call_tool","class:mcp-server/gate.py:ToolGate");
fs.writeFileSync(".ua/intermediate/batch-4.json",JSON.stringify({nodes,edges},null,1));
const ids=new Set(nodes.map(x=>x.id));
console.log(nodes.length,edges.length,edges.filter(e=>e.type!="imports"&&!ids.has(e.target)&&!e.target.startsWith("function:apps")&&!e.target.startsWith("function:scripts/core")).map(e=>e.target));
for(const x of nodes)if(!x.lineRange&&x.type!="file")console.log("nolr",x.id);
for(const x of nodes)if(x.type!="file"&&!x.lineRange)console.log(x.id);
