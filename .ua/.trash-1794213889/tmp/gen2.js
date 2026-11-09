const fs=require("fs");
const R=require("./ua-file-extract-results-2.json").results;
const I=require("./ua-file-analyzer-input-2.json").batchImportData;
const B="apps/desktop/cad_workbench/";
const F={
"agent_contracts.py":["Kontrakty agenta: profile korporacyjne, polityka uruchomień, kompilacja promptu Codex oraz walidacja ścieżek roboczych i zatwierdzeń.",["contracts","validation","policy","agent"]],
"agent_providers.py":["Rozwiązuje dostawców agentów (Codex/Node), buduje ich polecenia i normalizuje wyniki do ujednoliconego formatu.",["provider","adapter","agent","parsing"]],
"app.py":["Główne okno aplikacji desktopowej CAD Workbench (GUI) z obsługą projektów i uruchomień mock.",["gui","entry-point","desktop","component"]],
"artifact_ledger.py":["Buduje i zapisuje księgę artefaktów (ścieżki, skróty SHA-256, bazowe snapshoty) jako dowód bieżącego uruchomienia.",["ledger","artifacts","hashing","evidence"]],
"core.py":["Podstawowe narzędzia projektu: czas, katalogi wyjściowe, JSON, tworzenie drzewa projektu i domyślne parametry.",["utility","core","project","json"]],
"engineering_orchestrator.py":["Orkiestrator inżynierski: modele planu, fazy, trasy zdolności oraz budowa i ponowne planowanie po lokalnej zmianie.",["orchestration","planning","data-model","engineering"]],
"knowledge_retrieval.py":["Wyszukiwanie wiedzy lokalnej i chmurowej (chunking, tokenizacja, API) dla kontekstu zadania.",["retrieval","knowledge","search","context"]],
"mock_runner.py":["Mockowy runner: waliduje parametry i generuje symulowane wyniki bez uruchamiania prawdziwego CAD.",["mock","validation","runner","testing-aid"]],
"queue_worker.py":["Worker kolejki zadań: blokady, heartbeat, odzyskiwanie, uruchamianie agentów/Codex, DFM, bramki weryfikacji i pętla przetwarzania.",["worker","queue","job-processing","entry-point","concurrency"]],
"reviewer_gate.py":["Bramka recenzenta: waliduje formaty, pomiary i zgodność ze specyfikacją na podstawie księgi artefaktów.",["review","gate","validation","measurements"]],
"style.py":["Stylizacja interfejsu aplikacji desktopowej (arkusz stylów Qt).",["style","gui","theme","configuration"]],
"worker_health.py":["Zapis i odczyt stanu zdrowia workera oraz zliczanie zadań w kolejce.",["health","monitoring","worker","status"]]};
const FN={
"agent_contracts.py":{AgentRole:"Enum ról agenta.",AgentRunPolicy:"Polityka uruchomienia agenta (limity i zgody).",EnterpriseAgentProfile:"Profil agenta korporacyjnego z rolami i polityką.",profile_to_json:"Serializuje profil agenta do JSON.",load_profile:"Wczytuje i waliduje profil agenta z pliku.",compile_codex_prompt:"Kompiluje pełny prompt Codex z zadania i profilu.",safe_job_id:"Sanityzuje identyfikator zadania do bezpiecznej nazwy.",resolve_workspace:"Rozwiązuje i weryfikuje katalog roboczy zadania.",codex_output_path:"Wyznacza ścieżkę wyniku Codex.",agent_output_path:"Wyznacza ścieżkę wyniku agenta.",validate_codex_job:"Waliduje zadanie Codex przed uruchomieniem.",policy_reasons:"Zwraca powody blokady wynikające z polityki.",is_policy_approved:"Sprawdza, czy polityka została zatwierdzona.",require_policy_approval:"Wymusza zatwierdzenie polityki, inaczej zgłasza błąd."},
"agent_providers.py":{AgentProvider:"Opis dostawcy agenta (polecenie, tryb, metadane).",resolve_provider:"Wybiera i lokalizuje dostawcę agenta.",build_provider_command:"Buduje wiersz poleceń dla dostawcy.",parse_provider_result:"Parsuje wynik dostawcy (JSON lub tekst) do wspólnego formatu.",probe_provider:"Sprawdza dostępność dostawcy."},
"app.py":{MainWindow:"Okno główne GUI z formularzami projektu, parametrami i uruchomieniem mock."},
"artifact_ledger.py":{ledger_dir:"Katalog księgi artefaktów zadania.",ledger_path_for:"Ścieżka pliku księgi dla zadania.",sha256_file:"Oblicza SHA-256 pliku.",normalize_artifact_baseline:"Normalizuje bazowy snapshot artefaktów.",artifact_requires_current_run_proof:"Czy artefakt wymaga dowodu z bieżącego uruchomienia.",collect_artifact_paths:"Zbiera ścieżki artefaktów z wyniku zadania.",describe_artifact:"Opisuje artefakt (rozmiar, skrót, czas).",build_artifact_ledger:"Buduje strukturę księgi artefaktów.",write_artifact_ledger:"Zapisuje księgę na dysk."},
"core.py":{now_iso:"Aktualny czas ISO.",default_output_root:"Domyślny katalog wyjściowy.",repo_root:"Korzeń repozytorium.",slugify_project_name:"Zamienia nazwę projektu na slug.",write_json:"Zapisuje JSON do pliku.",read_json:"Wczytuje JSON z pliku.",ensure_project_tree:"Tworzy drzewo katalogów projektu.",build_project_payload:"Buduje ładunek metadanych projektu.",default_parameters:"Zwraca domyślne parametry modelu.",create_project:"Tworzy nowy projekt na dysku."},
"engineering_orchestrator.py":{CapabilityLevel:"Enum poziomów zdolności.",PhaseStatus:"Enum statusów fazy.",RetryPolicy:"Polityka ponowień fazy.",CapabilityRoute:"Trasa zdolności do handlera.",EngineeringPhase:"Faza planu inżynierskiego.",EngineeringPlan:"Plan inżynierski z fazami i serializacją.",engineering_plan_from_dict:"Odtwarza plan ze słownika.",requires_engineering_orchestration:"Czy zadanie wymaga orkiestracji.",build_engineering_plan:"Buduje plan inżynierski dla zadania.",infer_affected_phases:"Wnioskuje fazy dotknięte zmianą.",replan_for_local_change:"Przeplanowuje fazy po zmianie lokalnej."},
"knowledge_retrieval.py":{KnowledgeChunk:"Fragment dokumentu wiedzy z wynikiem.",default_knowledge_roots:"Domyślne katalogi wiedzy.",retrieve_local_knowledge:"Wyszukuje fragmenty w lokalnych dokumentach.",retrieve_cloud_knowledge:"Wyszukuje wiedzę przez API chmurowe.",build_job_knowledge_context:"Buduje kontekst wiedzy dla zadania."},
"mock_runner.py":{validate_parameters:"Waliduje parametry modelu i zakresy.",run_mock:"Symuluje uruchomienie i zapisuje artefakty mock."},
"queue_worker.py":{JobCancelled:"Wyjątek anulowania zadania.",JobBlocked:"Wyjątek zablokowania zadania.",resolve_codex_command:"Lokalizuje polecenie Codex.",read_job:"Wczytuje zadanie z kolejki.",write_job:"Zapisuje zadanie.",atomic_write_json:"Atomowy zapis JSON.",append_event:"Dopisuje zdarzenie zadania.",acquire_lock:"Zajmuje blokadę zadania.",release_lock:"Zwalnia blokadę zadania.",refresh_job_heartbeat:"Odświeża heartbeat dzierżawy.",request_cancel:"Zgłasza żądanie anulowania.",approve_job:"Zatwierdza zadanie.",recover_stale_jobs:"Odzyskuje zadania z wygasłą dzierżawą.",set_job_state:"Ustawia stan zadania.",run_dfm_review_job:"Wykonuje przegląd DFM.",run_agent_job:"Uruchamia zadanie agenta wraz z weryfikacją.",run_codex_job:"Uruchamia zadanie Codex.",terminate_process:"Kończy proces potomny.",process_job:"Przetwarza pojedyncze zadanie end-to-end.",build_handlers:"Buduje mapę handlerów zdolności.",process_queue:"Przetwarza kolejkę zadań.",watch_queue:"Nasłuchuje kolejki w pętli.",main:"Punkt wejścia CLI workera.",record_provider_verification:"Zapisuje weryfikację dostawcy.",previous_engineering_plan:"Odczytuje poprzedni plan inżynierski."},
"reviewer_gate.py":{review_dir:"Katalog wyników recenzji.",review_path_for:"Ścieżka pliku recenzji.",validate_known_format:"Waliduje znane formaty artefaktów.",evaluate_ledger:"Ocenia księgę: pomiary, zgodność, werdykt bramki.",write_reviewer_gate:"Zapisuje wynik bramki."},
"worker_health.py":{health_path_for:"Ścieżka pliku zdrowia.",count_jobs:"Zlicza zadania wg stanu.",health_level:"Określa poziom zdrowia.",write_worker_health:"Zapisuje stan zdrowia.",read_worker_health:"Odczytuje stan zdrowia."}};
const parts=[];
const nodes=[],edges=[];
const E=(s,t,ty,w)=>({source:s,target:t,type:ty,direction:"forward",weight:w});
const cx=n=>n>200?"complex":n>=50?"moderate":"simple";
const byFile={};
for(const r of R){const b=r.path.replace(B,"");const fid="file:"+r.path;const [s,t]=F[b];
const fn=[];fn.push({id:fid,type:"file",name:b,filePath:r.path,summary:s,tags:t,complexity:cx(r.nonEmptyLines)});
const es=[];
for(const i of I[r.path])es.push(E(fid,"file:"+i,"imports",0.7));
if(b=="artifact_ledger.py")es.push(E(fid,"file:mcp-server/artifact_access.py","depends_on",0.6));
for(const x of (r.functions||[]).map(f=>({...f,k:"function"})).concat((r.classes||[]).map(f=>({...f,k:"class"})))){
 const d=FN[b]&&FN[b][x.name];if(!d)continue;
 const id=x.k+":"+r.path+":"+x.name;
 fn.push({id,type:x.k,name:x.name,filePath:r.path,lineRange:[x.startLine,x.endLine],summary:d,tags:[x.k=="class"?"class":"function",t[0],t[1]],complexity:cx(x.endLine-x.startLine)});
 es.push(E(fid,id,"contains",1.0));
 if(!x.name.startsWith("_"))es.push(E(fid,id,"exports",0.8));
}
byFile[r.path]={nodes:fn,edges:es};}
const paths=Object.keys(byFile).sort();
let N=0,Ed=0;paths.forEach(p=>{N+=byFile[p].nodes.length;Ed+=byFile[p].edges.length});
const np=Math.ceil(Math.max(N/60,Ed/120));
const sz=Math.ceil(paths.length/np);
const out="/Users/tomasz/Developer/solidworks-automation-skill/.ua/intermediate/";
if(np<=1){fs.writeFileSync(out+"batch-2.json",JSON.stringify({nodes:paths.flatMap(p=>byFile[p].nodes),edges:paths.flatMap(p=>byFile[p].edges)}));}
else for(let k=0;k<np;k++){const ps=paths.slice(k*sz,(k+1)*sz);fs.writeFileSync(out+`batch-2-part-${k+1}.json`,JSON.stringify({nodes:ps.flatMap(p=>byFile[p].nodes),edges:ps.flatMap(p=>byFile[p].edges)}));}
console.log(N,Ed,np);
