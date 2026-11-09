const fs=require("fs");
const p=".ua/intermediate/assembled-graph.json";
const g=JSON.parse(fs.readFileSync(p,"utf8"));
const D=[
["execution-core","V2 Execution Core","Opis wewnętrznej warstwy niezawodnego wykonania (Execution Core): motywacja, architektura i granice odpowiedzialności. To implementacja wewnętrzna, nie punkt wejścia ani daemon.",["architecture","execution-core","reliability","v2"],"complex"],
["governance-attestation","Governance attestation","Źródło definicji offline'owego poświadczenia zestawu reguł governance: zbieranie, podpisywanie i weryfikacja tylko do odczytu, granice zaufania oraz dowód, że bypass_actors jest pusty.",["governance","attestation","security","ci"],"complex"],
["governance-bypass-remediation","Naprawa obejścia wymaganych kontroli","Analiza ryzyka bypass_mode=always w rulesecie protect-main oraz minimalny plan naprawy; plan zatwierdzony, ale jeszcze niewdrożony.",["governance","risk","remediation","ruleset"],"moderate"],
["real-golden-gripper-retention-travel-acceptance","Akceptacja P0-2.1: chwytak","Raport akceptacji P0-2.1: mechaniczne zatrzymanie chwytaka, tolerancje i statyczny pełny skok w osobnym scenariuszu Golden parallel_gripper_retention_travel.",["golden-workflow","acceptance","gripper","assembly"],"complex"],
["real-golden-merge-readiness","Raport gotowości do merge P0-1.2","Raport kontroli przed scaleniem P0-1.2: zmiany standardu governance, pełny audyt PR względem main i stos draftów PR.",["golden-workflow","merge-readiness","audit","governance"],"complex"],
["real-golden-parallel-gripper-acceptance","Akceptacja P0-2: chwytak równoległy","Akceptacja P0-2: natywny złożeniowy Golden dwupalcowego chwytaka równoległego; sprawdza strukturę, montaż i spójność dostawy, bez oceny napędu ani obciążalności.",["golden-workflow","acceptance","gripper","assembly"],"complex"],
["real-golden-workflow-acceptance","Akceptacja Golden Workflow SolidWorks 2026","Zapis rzeczywistej akceptacji Golden Workflow na SolidWorks 2026 (P0-1/P0-1.1): budowa, uruchomienie, pięć rund bramek ręcznych; liczby scenariuszy mają kontekst historyczny.",["golden-workflow","acceptance","solidworks-2026","evidence"],"complex"],
["remaining-pr-increments","Przyrostowe poprawki pozostałych PR","Krótka tabela poprawek przyrostowych (schemat B) dla zgłoszeń #8/#11/#23/#24/#25 z zachowaniem sprawdzonych kontraktów MCP, Queue, Reviewer i Artifact Ledger.",["pull-requests","increments","scheme-b","changelog"],"simple"],
["scheme-b-reliability","Schemat B: poprawki niezawodności","Poprawki niezawodności istniejącej architektury i wyniki weryfikacji z 2026-10-08; liczby scenariuszy są historyczne (obecnie 43, baseline v4).",["reliability","scheme-b","verification","history"],"moderate"],
["v2-audit","Audyt architektury V2","Raport audytu architektury V2 (faza 1): zakres i metoda, rzeczywista architektura; migawka historyczna, fazy 2–8 zostały już wdrożone.",["architecture","audit","v2","history"],"complex"],
["v2-evaluation","V2 Evaluation: Golden Workflow","Opis ewaluacji niezawodności Golden Workflow: po co ewaluacja, czym jest Golden Workflow oraz powtarzalne, mierzalne wskaźniki sukcesu nadające się do CI.",["evaluation","golden-workflow","reliability","ci"],"moderate"],
["v2-regression-report","V2 Regression Report","Raport regresji i bazowy poziom niezawodności V2 (faza 7/7.5): macierz regresji; liczby historyczne, bieżące wskaźniki opisuje baseline v4.",["regression","baseline","reliability","history"],"moderate"],
["v2-release-notes","V2 Release Notes (Draft)","Notatki wydania V2 w wersji roboczej: co dodano i co zachowano w wewnętrznym ulepszeniu niezawodności; nie odzwierciedlają obecnego statusu wydania.",["release-notes","v2","draft","changelog"],"simple"]];
const ids=new Set(g.nodes.map(n=>n.id));
for(const [slug,name,summary,tags,c] of D){
  const id=`document:docs/architecture/${slug}.md`;
  if(ids.has(id)) continue;
  g.nodes.push({id,type:"document",name:`${slug}.md`,filePath:`docs/architecture/${slug}.md`,summary,tags,complexity:c});
}
const E=[
["execution-core","v2-audit"],["v2-evaluation","v2-regression-report"],["scheme-b-reliability","v2-regression-report"],
["governance-bypass-remediation","governance-attestation"],["real-golden-merge-readiness","governance-attestation"],
["real-golden-parallel-gripper-acceptance","real-golden-workflow-acceptance"],
["real-golden-gripper-retention-travel-acceptance","real-golden-parallel-gripper-acceptance"],
["v2-release-notes","v2-regression-report"],["remaining-pr-increments","scheme-b-reliability"]];
for(const [a,b] of E) g.edges.push({source:`document:docs/architecture/${a}.md`,target:`document:docs/architecture/${b}.md`,type:"related",direction:"forward",weight:0.5});
fs.writeFileSync(p,JSON.stringify(g));
console.log(g.nodes.length,g.edges.length,JSON.stringify(g.edges[0]));
