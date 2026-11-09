import json
N=[];E=[]
def node(id,t,name,fp,s,tags,c,lr=None,ln=None):
    d={"id":id,"type":t,"name":name,"summary":s,"tags":tags,"complexity":c}
    if fp:d["filePath"]=fp
    if lr:d["lineRange"]=lr
    if ln:d["languageNotes"]=ln
    N.append(d)
def edge(s,t,ty,w):E.append({"source":s,"target":t,"type":ty,"direction":"forward","weight":w})
def fn(p,name,lr,s,tags,c="simple",kind="function"):
    id=f"{kind}:{p}:{name}"
    node(id,kind,name,p,s,tags,c,lr)
    edge(f"file:{p}",id,"contains",1.0)
T="apps/workbench-ui/src-tauri/src/runtime_boundary_tests.rs"
node("file:apps/workbench-ui/src-tauri/src/main.rs","file","main.rs","apps/workbench-ui/src-tauri/src/main.rs","Punkt wejścia aplikacji Tauri; deleguje uruchomienie do funkcji run z biblioteki crate.",["entry-point","tauri","rust"],"simple")
edge("file:apps/workbench-ui/src-tauri/src/main.rs","function:apps/workbench-ui/src-tauri/src/lib.rs:run","calls",0.8)
node("file:"+T,"file","runtime_boundary_tests.rs",T,"Testy integracyjne granicy runtime: izolacja fixture, obsługa ścieżek agentów, ścieżek ze spacjami i znakami chińskimi oraz odrzucanie symlinków poza rootem.",["test","rust","runtime-boundary","filesystem"],"moderate")
edge("file:apps/workbench-ui/src-tauri/src/lib.rs","file:"+T,"tested_by",0.5)
edge("file:"+T,"function:apps/workbench-ui/src-tauri/src/lib.rs:run","calls",0.8)
fn(T,"Fixture",[12,12],"Struktura pomocnicza testów przechowująca tymczasowy katalog fixture.",["test","fixture","helper"],kind="class")
fn(T,"with_timestamp",[23,32],"Tworzy fixture z jawnym znacznikiem czasu w nazwie katalogu.",["test","fixture","helper"])
for n,lr,s in [("fixtures_with_identical_timestamps_remain_isolated",[36,50],"Sprawdza, że fixture z identycznym znacznikiem czasu pozostają od siebie odizolowane."),("all_existing_agent_path_names_remain_supported",[71,88],"Weryfikuje, że wszystkie dotychczasowe nazwy ścieżek agentów nadal są obsługiwane."),("fixed_json_and_database_paths_share_the_same_boundary",[91,105],"Test, że stałe ścieżki JSON i bazy danych dzielą tę samą granicę runtime."),("explicit_cli_with_spaces_and_chinese_path_still_runs",[109,128],"Test uruchomienia jawnego CLI ze ścieżką zawierającą spacje i znaki chińskie."),("config_symlink_outside_root_is_rejected",[132,150],"Sprawdza odrzucenie konfiguracji będącej symlinkiem wskazującym poza root.")]:
    fn(T,n,lr,s,["test","runtime-boundary","assertion"])
fn(T,"drop",[52,67],"Implementacja Drop sprzątająca katalog tymczasowy fixture.",["test","cleanup","raii"])
def cfg(id,p,s,tags,c="simple"):
    node("config:"+p,"config",p.split("/")[-1],p,s,tags,c)
cfg("","apps/workbench-ui/src-tauri/tauri.conf.json","Konfiguracja aplikacji Tauri: okno, bundling, zasoby i ustawienia bezpieczeństwa workbench UI.",["configuration","tauri","desktop","build-system"],"moderate")
edge("config:apps/workbench-ui/src-tauri/tauri.conf.json","file:apps/workbench-ui/src-tauri/src/main.rs","configures",0.6)
def doc(p,s,tags,c="simple"):
    node("document:"+p,"document",p.split("/")[-1],p,s,tags,c)
doc("apps/workbench-ui/src/assets/WALLPAPER_CREDITS.md","Informacje o autorach i licencjach tapet użytych w workbench UI.",["documentation","credits","assets"])
for a,d in [("default-blossom-poster","domyślny plakat kwitnącej wiśni"),("wallpaper-anime-sky","tapeta w stylu anime z niebem"),("wallpaper-fuji","tapeta z górą Fuji"),("wallpaper-tokyo-neon","tapeta neonowego Tokio")]:
    p=f"apps/workbench-ui/src/assets/{a}.webp"
    node("file:"+p,"file",a+".webp",p,f"Zasób graficzny WebP: {d} używany jako tło interfejsu workbench.",["asset","image","webp","wallpaper"],"simple")
    edge("document:apps/workbench-ui/src/assets/WALLPAPER_CREDITS.md","file:"+p,"documents",0.5)
node("file:apps/workbench-ui/src/styles.css","file","styles.css","apps/workbench-ui/src/styles.css","Główny arkusz stylów workbench UI (ok. 5,5 tys. linii) z motywami, układem paneli i komponentów oraz tłami.",["css","styling","theme","ui"],"complex")
edge("file:apps/workbench-ui/src/styles.css","file:apps/workbench-ui/src/main.tsx","related",0.5)
node("file:apps/workbench-ui/vite.config.ts","file","vite.config.ts","apps/workbench-ui/vite.config.ts","Konfiguracja Vite dla workbench UI (serwer dev i build pod Tauri).",["configuration","vite","build-system","typescript"],"simple")
cfg("","config/runtime.example.json","Przykładowy plik konfiguracji runtime kopiowany przez użytkownika.",["configuration","example","runtime"])
doc("config/README.md","Opis plików konfiguracyjnych runtime, ich pól i zasad użycia.",["documentation","configuration","runtime"],"moderate")
edge("document:config/README.md","config:config/runtime.example.json","documents",0.5)
doc("docs/agent-framework/enterprise-agent-control-plane.md","Opis architektury enterprise control plane dla frameworka agentów.",["documentation","architecture","agent-framework"],"moderate")
doc("docs/releases/v2.0.1.md","Notatki wydania v2.0.1 z listą zmian.",["documentation","release-notes","changelog"])
doc("docs/research/week1-js-cad-viewers.md","Notatki badawcze porównujące JavaScriptowe przeglądarki CAD (tydzień 1).",["documentation","research","cad-viewer"])
node("file:dotnet/CadStudio.SolidWorks.AddinHost/CadStudio.AddinHost.snk.base64","file","CadStudio.AddinHost.snk.base64","dotnet/CadStudio.SolidWorks.AddinHost/CadStudio.AddinHost.snk.base64","Klucz silnej nazwy (snk) assembly add-inu zakodowany w base64.",["security","signing","dotnet","key"],"simple")
node("config:dotnet/CadStudio.SolidWorks.AddinHost/CadStudio.SolidWorks.AddinHost.csproj","config","CadStudio.SolidWorks.AddinHost.csproj","dotnet/CadStudio.SolidWorks.AddinHost/CadStudio.SolidWorks.AddinHost.csproj","Projekt .NET add-inu SolidWorks: framework docelowy, referencje COM, podpisywanie assembly.",["configuration","dotnet","build-system","solidworks"],"moderate")
D="dotnet/CadStudio.SolidWorks.AddinHost/"
for f in ["HostDiagnostics.cs","Properties/AssemblyInfo.cs","PropertyPageHandler.cs","SwAddin.cs","TaskPaneControl.cs"]:
    edge("config:"+D+"CadStudio.SolidWorks.AddinHost.csproj","file:"+D+f,"configures",0.6)
edge("config:"+D+"CadStudio.SolidWorks.AddinHost.csproj","file:"+D+"CadStudio.AddinHost.snk.base64","configures",0.6)
node("file:"+D+"HostDiagnostics.cs","file","HostDiagnostics.cs",D+"HostDiagnostics.cs","Statyczna klasa diagnostyczna hosta add-inu zapisująca stan połączenia, UI, zdarzenia i błędy do pliku.",["diagnostics","logging","dotnet","solidworks"],"moderate")
fn(D+"HostDiagnostics.cs","HostDiagnostics",[11,140],"Zbiera i zapisuje diagnostykę hosta add-inu (połączenie, UI, zdarzenia, błędy).",["diagnostics","logging","state"],"moderate","class")
fn(D+"HostDiagnostics.cs","WriteUnsafe",[114,139],"Zapisuje migawkę diagnostyki do pliku bez blokowania.",["diagnostics","io","helper"])
fn(D+"HostDiagnostics.cs","MarkConnection",[40,50],"Oznacza nawiązanie połączenia z SolidWorks w diagnostyce.",["diagnostics","connection"])
fn(D+"HostDiagnostics.cs","RecordError",[77,88],"Rejestruje błąd w diagnostyce hosta.",["diagnostics","error-handling"])
fn(D+"HostDiagnostics.cs","MarkDisconnected",[100,111],"Oznacza rozłączenie add-inu od SolidWorks.",["diagnostics","connection"])
node("file:"+D+"Properties/AssemblyInfo.cs","file","AssemblyInfo.cs",D+"Properties/AssemblyInfo.cs","Metadane assembly add-inu (atrybuty wersji i COM).",["dotnet","metadata","assembly"],"simple")
node("file:"+D+"PropertyPageHandler.cs","file","PropertyPageHandler.cs",D+"PropertyPageHandler.cs","Pusta implementacja handlera PropertyManager Page SolidWorks z no-op callbackami zdarzeń.",["solidworks","property-page","event-handler","dotnet"],"moderate")
fn(D+"PropertyPageHandler.cs","PropertyPageHandler",[8,58],"Klasa implementująca interfejs handlera strony właściwości, z większością zdarzeń jako no-op.",["event-handler","property-page","com"],"moderate","class")
node("file:"+D+"SwAddin.cs","file","SwAddin.cs",D+"SwAddin.cs","Główna klasa COM add-inu SolidWorks: rejestracja, połączenie, grupa poleceń, panel zadań, PropertyManager Page i obsługa zdarzeń aplikacji.",["entry-point","solidworks","com-addin","dotnet"],"complex","C# COM add-in z atrybutami rejestracji ComRegisterFunction.")
fn(D+"SwAddin.cs","SwAddin",[13,397],"Implementacja ISwAddin: cykl życia add-inu i integracja UI z SolidWorks.",["com-addin","lifecycle","ui"],"complex","class")
for n,lr,s in [("ConnectToSW",[71,109],"Łączy add-in z SolidWorks i inicjalizuje UI oraz zdarzenia."),("CreateCommandGroup",[168,194],"Tworzy grupę poleceń i przyciski na pasku SolidWorks."),("CreatePropertyManagerPage",[236,275],"Buduje stronę PropertyManager add-inu."),("ReleaseHostResources",[302,333],"Zwalnia zasoby COM i UI przy rozłączeniu."),("CreateIconFile",[365,396],"Generuje plik ikony dla poleceń add-inu."),("DisconnectFromSW",[112,119],"Rozłącza add-in z SolidWorks."),("Register",[45,59],"Rejestruje add-in w rejestrze COM."),("CreateTaskPane",[221,233],"Tworzy panel zadań z kontrolką hosta.")]:
    fn(D+"SwAddin.cs",n,lr,s,["solidworks","addin","lifecycle"],"moderate" if lr[1]-lr[0]>25 else "simple")
node("file:"+D+"TaskPaneControl.cs","file","TaskPaneControl.cs",D+"TaskPaneControl.cs","Kontrolka WinForms osadzana w panelu zadań SolidWorks.",["ui","winforms","task-pane","dotnet"],"simple")
fn(D+"TaskPaneControl.cs","TaskPaneControl",[8,57],"Kontrolka UserControl wyświetlana w panelu zadań add-inu.",["ui","winforms","component"],"simple","class")
edge("file:"+D+"SwAddin.cs","class:"+D+"TaskPaneControl.cs:TaskPaneControl","depends_on",0.6)
edge("file:"+D+"SwAddin.cs","class:"+D+"PropertyPageHandler.cs:PropertyPageHandler","depends_on",0.6)
edge("file:"+D+"SwAddin.cs","class:"+D+"HostDiagnostics.cs:HostDiagnostics","depends_on",0.6)
for p,s in [("03_assembly","Przykład tworzenia złożenia SolidWorks przez API automatyzacji."),("04_batch_export","Przykład wsadowego eksportu dokumentów SolidWorks do innych formatów."),("05_drawing","Przykład tworzenia rysunku technicznego przez automatyzację.")]:
    f=f"examples/{p}.py"
    node("file:"+f,"file",p+".py",f,s,["example","python","solidworks","script"],"simple")
    fn(f,"main",[1,1],"Funkcja główna przykładu.",["example","entry-point"]) if False else None
    E.append({"source":"file:"+f,"target":"function:"+f+":main","type":"contains","direction":"forward","weight":1.0})
    N.append({"id":"function:"+f+":main","type":"function","name":"main","filePath":f,"summary":"Funkcja główna przykładu: "+s,"tags":["example","entry-point","demo"],"complexity":"simple"})
rng={"03_assembly":[16,53],"04_batch_export":[12,39],"05_drawing":[16,43]}
for n in N:
    if n["id"].startswith("function:examples/"):n["lineRange"]=rng[n["filePath"].split("/")[1][:-3]]
doc("x","","",)  if False else None
ids={n["id"] for n in N}
assert len(ids)==len(N)
json.dump({"nodes":N,"edges":E},open(".ua/intermediate/batch-35.json","w"),ensure_ascii=False,indent=1)
print(len(N),len(E))
