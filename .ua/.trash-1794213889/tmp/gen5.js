const fs=require("fs");
const imp=require("./nm5.json")&&JSON.parse(fs.readFileSync(".ua/tmp/ua-file-analyzer-input-5.json")).batchImportData;
const nodes=[],edges=[];
const files={
"scripts/core/__init__.py":["Barrel pakietu core: reeksportuje publiczne API modeli stanu, fasady capability, trace, weryfikacji, recovery i orkiestracji wykonania.","moderate",["barrel","entry-point","execution-core","reexport"],"Dokumentacja pakietu ostrzega, by importować przez core.* bez wyzwalania COM z scripts/__init__.py."],
"scripts/core/capability.py":["Fasada nad capabilities.yaml: ładuje definicje, wyznacza trasę operacji, kandydatów backendu i wymóg review.","moderate",["capability","router","facade","configuration"]],
"scripts/core/execution.py":["Wewnętrzna warstwa orkiestracji execute_with_core łącząca stan, handler, weryfikację, recovery i trace dla niezawodnego wykonania operacji.","complex",["orchestration","execution","reliability","normalization"]],
"scripts/core/recovery.py":["Deterministyczna warstwa decyzyjna po błędach: klasyfikuje błędy (ErrorKind) i wybiera akcję recovery bez jej wykonywania.","complex",["recovery","error-classification","decision-engine","deterministic"]],
"scripts/core/state.py":["Modele danych stanu wykonania (enumy statusów, RunContext, StepRecord, VerificationResult, RecoveryDecision) z walidacją przejść i serializacją JSON.","complex",["data-model","state-machine","serialization","execution-core"]],
"scripts/core/trace.py":["Adapter append-only śladu wykonania oparty o queue/events: zapis, redakcja danych wrażliwych i odczyt zdarzeń.","moderate",["trace","logging","redaction","adapter"]],
"scripts/core/verification.py":["Adapter agregujący wyniki Reviewera do ujednoliconego VerificationResult wraz ze statusami, artefaktami i zdarzeniami trace.","complex",["verification","adapter","aggregation","review"]]};
const fn={
"capability.py":[["load_capabilities",22,24,0],["get_operation_route",33,36,0],["get_backend_candidates",39,45,0],["resolve_backend",48,65,"Wybiera backend dla operacji na podstawie kandydatów i dostępności."],["requires_review",68,85,"Określa, czy operacja wymaga przeglądu (review)."],["get_capability_status",88,115,"Zwraca status capability."],["capability_gap",118,137,"Wylicza lukę możliwości (brakujące wsparcie) dla żądanej operacji."]],
"execution.py":[["normalize_tool_payload",40,61,"Normalizuje wynik narzędzia do spójnego słownika payload."],["execute_with_core",155,331,"Główna orkiestracja: uruchamia handler, weryfikuje wynik, stosuje recovery i emituje trace."]],
"recovery.py":[["classify_error",272,328,"Klasyfikuje błąd do ErrorKind na podstawie wyjątku, weryfikacji i capability."],["decide",381,495,"Podejmuje deterministyczną decyzję recovery (retry, fallback, abort) dla błędu."]],
"state.py":[["can_transition_run",161,167,0],["ensure_run_transition",179,186,0],["ensure_step_transition",189,196,0]],
"trace.py":[["redact",87,95,"Redaguje wrażliwe wartości przed zapisem do śladu."],["append_event",108,115,"Dopisuje zdarzenie do pliku trace (append-only)."],["emit",118,160,"Buduje i zapisuje zdarzenie trace z deduplikacją."],["read_events",163,180,"Odczytuje zdarzenia trace z pliku."]],
"verification.py":[["verify",213,332,"Agreguje wyniki Reviewera w VerificationResult i emituje zdarzenia trace."],["aggregate_statuses",82,87,"Agreguje listę statusów weryfikacji do jednego."],["normalize_status",73,79,"Normalizuje status do VerificationStatus."]]};
const cls={"execution.py":[["ExecutionAssessment",102,125,"Struktura oceny wyniku wykonania (sukces, komunikat, błąd)."]],
"recovery.py":[["ErrorKind",28,40,"Enum rodzajów błędów używany w klasyfikacji recovery."]],
"state.py":[["RunStatus",32,41,"Enum statusów przebiegu."],["StepStatus",44,53,"Enum statusów kroku."],["VerificationStatus",56,62,"Enum statusów weryfikacji."],["InvalidStateTransition",78,79,"Wyjątek dla niedozwolonego przejścia stanu."],["VerificationResult",214,237,"Model wyniku weryfikacji."],["RecoveryDecision",241,268,"Model decyzji recovery."],["ExecutionResult",272,301,"Model wyniku wykonania."],["StepRecord",305,359,"Rekord pojedynczego kroku z przejściami statusów."],["RunContext",363,422,"Kontekst przebiegu agregujący kroki i status."]]};
for(const p in files){const [s,c,t,l]=files[p];const id="file:"+p;
nodes.push({id,type:"file",name:p.split("/").pop(),filePath:p,summary:s,tags:t,complexity:c,...(l?{languageNotes:l}:{})});
const b=p.split("/").pop();
for(const [n,a,e,d] of fn[b]||[]){const fid=`function:${p}:${n}`;nodes.push({id:fid,type:"function",name:n,filePath:p,lineRange:[a,e],summary:d||`Funkcja pomocnicza ${n} w ${b}.`,tags:["function",t[0],"python"],complexity:e-a>60?"complex":e-a>15?"moderate":"simple"});edges.push({source:id,target:fid,type:"contains",direction:"forward",weight:1.0});edges.push({source:id,target:fid,type:"exports",direction:"forward",weight:0.8});}
for(const [n,a,e,d] of cls[b]||[]){const cid=`class:${p}:${n}`;nodes.push({id:cid,type:"class",name:n,filePath:p,lineRange:[a,e],summary:d,tags:["class",t[0],"python"],complexity:e-a>40?"moderate":"simple"});edges.push({source:id,target:cid,type:"contains",direction:"forward",weight:1.0});edges.push({source:id,target:cid,type:"exports",direction:"forward",weight:0.8});}
for(const q of imp[p])edges.push({source:id,target:"file:"+q,type:"imports",direction:"forward",weight:0.7});}
// fix generic descriptions for the 0 entries
for(const n of nodes)if(n.summary.startsWith("Funkcja pomocnicza")){const m={load_capabilities:"Ładuje definicje capability z capabilities.yaml.",get_operation_route:"Zwraca trasę routingu dla operacji.",get_backend_candidates:"Zwraca listę kandydatów backendu dla capability.",can_transition_run:"Sprawdza, czy przejście statusu przebiegu jest dozwolone.",ensure_run_transition:"Wymusza dozwolone przejście przebiegu, inaczej rzuca InvalidStateTransition.",ensure_step_transition:"Wymusza dozwolone przejście kroku, inaczej rzuca InvalidStateTransition."};if(m[n.name])n.summary=m[n.name];}
edges.push({source:"file:scripts/core/execution.py",target:"file:mcp-server/server.py",type:"related",direction:"forward",weight:0.5});
fs.writeFileSync(".ua/intermediate/batch-5.json",JSON.stringify({nodes,edges},null,1));
console.log(nodes.length,edges.length,edges.filter(e=>e.type=="imports").length);
