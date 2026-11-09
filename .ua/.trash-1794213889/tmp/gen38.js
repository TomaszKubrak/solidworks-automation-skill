const files=[
["scripts/sw_document_data.py","Zarządza konfiguracjami dokumentu SolidWorks, wymiarami i właściwościami niestandardowymi (odczyt, tworzenie, aktywacja, aktualizacja).",["document","configuration","properties"],"complex"],
["scripts/sw_drawing.py","Cienka fasada modułu rysunków SolidWorks udostępniająca funkcje rysunkowe pozostałym skryptom.",["drawing","facade","solidworks"],"simple"],
["scripts/sw_drawing_review.py","Cienka fasada przeglądu rysunków przekierowująca do logiki weryfikacji rysunku.",["drawing","review","facade"],"simple"],
["scripts/sw_edge_select.py","Opisuje, filtruje i wybiera krawędzie modelu (długość, średnica, wypukłość) dla semantycznego wyboru krawędzi.",["edge-selection","geometry","semantic"],"complex"],
["scripts/sw_entity_reference.py","Definiuje semantyczne odwołania do encji z sygnaturą geometrii i ich ponowne rozwiązywanie w modelu.",["entity-reference","geometry","data-model"],"simple"],
["scripts/sw_export.py","Eksport modeli i rysunków do STEP, STL, IGES, Parasolid, PDF, DXF oraz eksport wsadowy.",["export","file-format","batch"],"complex"],
["scripts/sw_file_load.py","Klasyfikuje błędy i ostrzeżenia ładowania plików SolidWorks oraz definiuje wyjątek otwarcia dokumentu.",["error-handling","file-load","validation"],"simple"],
["scripts/sw_gdt_options.py","Normalizuje opcje GD&T (bazy, tolerancje, modyfikatory) i dopisuje je do XML ramki tolerancji.",["gdt","xml","normalization"],"complex"],
["scripts/sw_gear.py","Oblicza geometrię zewnętrznego koła zębatego walcowego i tworzy je w SolidWorks.",["gear","parametric","geometry"],"complex"],
["scripts/sw_hole_features.py","Tworzy elementy otworów (nieprzelotowe, przelotowe, z pogłębieniem, rowki) i wzory otworów.",["hole","features","modeling"],"complex"],
["scripts/sw_import_mesh_reference.py","Skrypt CLI importujący siatkę jako referencję z konfiguracją preferencji importu.",["mesh-import","cli","reference"],"complex"],
["scripts/sw_macro_guard.py","Generuje i waliduje makra VBA z modelu AI z zabezpieczeniami oraz makrami zastępczymi.",["macro","vba","guard","cli"],"complex"],
["scripts/sw_mcp_approve.py","Interaktywne CLI zatwierdzania oczekujących operacji MCP przez użytkownika.",["mcp","approval","cli"],"moderate"],
["scripts/sw_measure.py","Zbiera właściwości masowe, bryłę ograniczającą, interferencje i sprawdza pasowania tolerancyjne.",["measurement","mass-properties","interference"],"complex"],
["scripts/sw_motion.py","Obsługa Motion Study: tworzenie badań, silniki obrotowe, obliczenia i walidacja podsumowań.",["motion","simulation","com"],"complex"],
["scripts/sw_native_wire.cs","Narzędzia C# łączące się z działającym SolidWorks przez ROT oraz budujące sweep i bryły natywnie.",["csharp","com-interop","sweep"],"moderate"],
["scripts/sw_pattern.py","Tworzy liniowe i kołowe szyki elementów w SolidWorks.",["pattern","features","modeling"],"simple"],
["scripts/sw_process.py","Wyświetla uruchomione procesy SolidWorks w systemie.",["process","diagnostics","utility"],"simple"],
["scripts/sw_review.py","Rozbudowany moduł przeglądu: układ rysunku, PDF/BMP, podglądy, pomiary geometrii i raport oceny.",["review","report","validation","drawing"],"complex"],
["scripts/sw_sheet_metal.py","Tworzy podstawowy kołnierz blachy i zbiera dowody cech blachy.",["sheet-metal","features","evidence"],"moderate"],
["scripts/sw_spring.py","Waliduje specyfikację i tworzy otwartą sprężynę śrubową z weryfikacją gabarytów.",["spring","helix","parametric"],"moderate"],
["scripts/sw_sprocket.py","Tworzy przybliżone koło łańcuchowe na podstawie specyfikacji.",["sprocket","parametric","modeling"],"simple"],
["scripts/sw_tolerance_extract.py","Wyodrębnia tolerancje wymiarów z dokumentu i zapisuje je do CSV.",["tolerance","extraction","csv"],"moderate"],
["scripts/sw_weldment.py","Obsługa spawanych konstrukcji: profile, elementy strukturalne, cut list i eksport CSV.",["weldment","cut-list","features"],"complex"],
["scripts/sync_bundled_skill.py","Synchronizuje pliki runtime do dołączonego skilla.",["sync","build-system","cli"],"moderate"],
];
const fns={
"scripts/sw_document_data.py":[["inspect_configurations",67,77,"Odczytuje listę konfiguracji dokumentu."],["activate_configuration",80,119,"Aktywuje wskazaną konfigurację."],["create_configuration",122,197,"Tworzy nową konfigurację."],["update_dimension_mm",207,285,"Aktualizuje wymiar w mm."],["read_custom_property",296,313,"Odczytuje właściwość niestandardową."],["set_custom_properties",316,354,"Ustawia właściwości niestandardowe."]],
"scripts/sw_edge_select.py":[["describe_edge",129,230,"Buduje opis geometrii krawędzi."],["filter_edges",305,399,"Filtruje krawędzie według kryteriów."],["select_edges",402,487,"Wybiera krawędzie w modelu."]],
"scripts/sw_entity_reference.py":[["resolve_semantic_reference",53,75,"Rozwiązuje semantyczne odwołanie do encji."]],
"scripts/sw_export.py":[["export_flat_pattern_dxf",114,159,"Eksportuje rozwinięcie do DXF."],["batch_export_formats",253,350,"Wsadowy eksport do wielu formatów."]],
"scripts/sw_gdt_options.py":[["normalize_detail",71,100,"Normalizuje szczegóły tolerancji GD&T."],["append_options_before_material",281,329,"Dopisuje opcje GD&T do XML przed modyfikatorem materiału."]],
"scripts/sw_gear.py":[["calculate_external_spur_gear",100,234,"Oblicza geometrię koła zębatego."],["create_external_spur_gear",237,301,"Tworzy koło zębate w SolidWorks."]],
"scripts/sw_hole_features.py":[["create_counterbore_hole",152,174,"Tworzy otwór z pogłębieniem walcowym."],["create_countersink_hole",177,204,"Tworzy otwór z pogłębieniem stożkowym."]],
"scripts/sw_import_mesh_reference.py":[["import_mesh_reference",137,219,"Importuje siatkę jako referencję."]],
"scripts/sw_macro_guard.py":[["generate_macro_with_guard",249,298,"Generuje makro z walidacją i fallbackiem."]],
"scripts/sw_measure.py":[["collect_mass_properties",60,196,"Zbiera właściwości masowe."],["inspect_interference",248,348,"Sprawdza interferencje zespołu."]],
"scripts/sw_motion.py":[["validate_motion_study_summary",390,489,"Waliduje podsumowanie badania ruchu."]],
"scripts/sw_review.py":[["review_drawing_layout",86,313,"Ocenia układ rysunku."],["build_review_report",897,978,"Buduje raport przeglądu."],["evaluate_review_report",981,1151,"Ocenia raport i wystawia werdykt."]],
"scripts/sw_weldment.py":[["create_structural_member",106,162,"Tworzy element strukturalny."]],
"scripts/sw_pattern.py":[["linear_pattern",62,90,"Tworzy szyk liniowy."],["circular_pattern",93,112,"Tworzy szyk kołowy."]],
};
const cls={"scripts/sw_gear.py":[["SpurGearSpec",10,20,"Specyfikacja koła zębatego."],["SpurGearGeometry",24,66,"Wyliczona geometria koła."]],"scripts/sw_entity_reference.py":[["SemanticEntityReference",16,25,"Semantyczne odwołanie do encji."]],"scripts/sw_file_load.py":[["SolidWorksDocumentOpenError",29,40,"Wyjątek otwarcia dokumentu."]],"scripts/sw_macro_guard.py":[["MacroValidationResult",159,163,"Wynik walidacji makra."],["MacroGenerationResult",167,173,"Wynik generowania makra."]]};
const nodes=[],edges=[];
for(const [p,s,t,c] of files){nodes.push({id:"file:"+p,type:"file",name:p.split("/").pop(),filePath:p,summary:s,tags:t,complexity:c});}
const add=(kind,p,arr)=>{for(const [n,a,b,s] of arr){const id=kind+":"+p+":"+n;nodes.push({id,type:kind,name:n,filePath:p,lineRange:[a,b],summary:s,tags:[kind==="class"?"data-model":"function","solidworks",p.split("/").pop().replace(/\.py$/,"").replace(/_/g,"-")],complexity:b-a>60?"moderate":"simple"});edges.push({source:"file:"+p,target:id,type:"contains",direction:"forward",weight:1.0});}};
for(const p in fns)add("function",p,fns[p]);for(const p in cls)add("class",p,cls[p]);
edges.push({source:"file:scripts/sw_review.py",target:"file:subskills/solidworks-engineering-drawing/scripts/drawing_review.py",type:"related",direction:"forward",weight:0.5});
const fs=require("fs");
console.log(nodes.length,edges.length);
fs.writeFileSync(".ua/intermediate/batch-38.json",JSON.stringify({nodes,edges},null,1));
