# Research talks for the Job Talk Field Guide

13 September 2026

Twelve cases from eleven public research decks. The current selection covers international trade, labor and technology, health insurance, banking, macro finance, development finance, monetary policy, computational macro, climate, and one network-game case. The banking peer-response case is the only other example about interaction across agents.

Every revised slide is rendered in a single gallery style. No revised panel embeds an original slide image. Each case makes one presentation point; source notes and numerical provenance stay outside the slides.

## Current cases

| Case | Field | Research talk | One point |

|---|---|---|---|

| 01 · Make the comparison visible. | International trade | [On the Persistence of the China Shock](https://www.brookings.edu/wp-content/uploads/2021/08/6a_ADH-BPEA-Slides-Final.pdf) · PDF 20 | Two highlighted rows still ask the listener to search through a page of numbers. |

| 02 · Give the model a reason to exist. | Macro finance | [Financial Intermediation and Credit Policy](https://www.cirje.e.u-tokyo.ac.jp/research/workshops/macro/macropaper10/macro0622slides.pdf) · PDF 6; reconstruction uses 10–12 | Make the funding problem concrete before introducing the economy. |

| 03 · Put the meaning next to the symbol. | Labor & technology | [Robots and Jobs](https://www.yjs.fi/wp-content/uploads/daron-acemoglu_robots-and-jobs_part-1.pdf) · PDF 17 | A notation key should be where the listener needs it. |

| 04 · Give the model a concrete case first. | Health insurance | [Estimating the Tradeoff Between Risk Protection and Moral Hazard with a Nonlinear Budget Set Model of Health Insurance](https://users.nber.org/~kowalski/nlbspres10_25_12.pdf) · PDF 4, 20; setting 19 | Start with an actual insurance contract, then explain the model that evaluates it. |

| 05 · Explain one segment before the full diagram. | Health insurance | [Estimating the Tradeoff Between Risk Protection and Moral Hazard with a Nonlinear Budget Set Model of Health Insurance](https://users.nber.org/~kowalski/nlbspres10_25_12.pdf) · PDF 16; context 15; contract 20 | A contract segment and its extension have different meanings. Make that distinction visible first. |

| 06 · Draw the uncertainty with the estimate. | Banking | [Strategic complementarity in banks’ funding liquidity choices and financial stability](https://eba.europa.eu/documents/10180/1018121/Silva%2B-%2BStrategic%2Bcomplementarity%2Bin%2Bbanks%27%20funding%2Bliquidity%2Bchoices%2Band%2Bfinancial%2Bstability%2B-%2BPresentation.pdf/6c025e56-3737-45bd-a59d-bed72647afca) · PDF 58 (printed 14/17) | Make precision visible with the estimate. |

| 07 · Put the finding in the title. | Development finance | [Elite Capture of Foreign Aid: Evidence from Offshore Bank Accounts](https://thedocs.worldbank.org/en/doc/605901583339487690-0050022020/render/EliteCaptureofForeignAid.pdf) · PDF 39 | “Baseline Results” names the section. A sentence tells the room what the table says. |

| 08 · Let two people teach the general case. | Network games | [Targeting interventions in networks](https://bengolub.net/wp-content/uploads/2020/09/TIN_slides.pdf) · PDF 2, 10; equilibrium equation 36 | Work through two players’ incentives before moving to the general network. |

| 09 · Restore the argument at each stop. | Monetary policy | [Monetary Policy According to HANK](https://benjaminmoll.com/wp-content/uploads/2019/07/HANK_slides.pdf) · PDF 10, 14, 19 | At each section break, restore the economic problem the next section solves. |

| 10 · Give the evidence a main route. | Labor markets | [Competitive Search: A Test of Direction and Efficiency](https://www.minneapolisfed.org/economic-research/conferences/~/media/files/research/events/2009_11_19/slides/Presenter8-slides-MNFed.pdf) · PDF 11, 14–15, 19; full tests 24 | Reach the specification tests before unpacking the full likelihood. |

| 11 · Teach one path before the full system. | Computational macro | [Using the Sequence-Space Jacobian to Solve and Estimate Heterogeneous-Agent Models](https://raw.githubusercontent.com/shade-econ/sequence-jacobian/bcca2eff6041abc77d0a777e6c64f9ac6ff44305/docs/sequence_jacobian_slides.pdf) · PDF 72 | Read the unknowns, blocks, and equilibrium targets before tracing twenty connections. |

| 12 · Attach each limitation to the result. | Climate & macro | [The Macroeconomic Impact of Europe’s Carbon Taxes](https://www.frbsf.org/economic-research/wp-content/uploads/sites/4/Stock-FRBSF-Seminar-071620.pdf) · PDF 40; result on 25 | A closing slide should say which inference each limitation qualifies. |



## Whole talk schematics

Cases04,09,10 contain complete original and revised schematic sequences in paired slide viewers. Each begins with an overview. Source page links sit outside the slide canvas. The source outlines retain the actual order, including original HANK section dividers and technical support. Revised outlines place concrete research content at the focal transitions.

Case04 moves an offered health-insurance contract before its general budget and welfare model. Case09 preserves the order and gives the solution, calibration, and policy-experiment transitions an economic question. Case10 moves the likelihood derivation into a technical reserve after the main tests and conclusions.

## Numerical reconstruction

- Kowalski contract: deductible$350; coinsurance20%; out-of-pocket cap$2,100. At total spending$1,000, patient pays$480 and insurer$520. The cap begins at total spending$9,100. The local coinsurance budget is A+0.2Q=B−280, where B is income after premium.

- Silva: all four coefficients and standard errors from one liquidity-creation specification are retained. Intervals are coefficient±1.96×bank-clusteredSE. Labels explicitly name responding banks and peers; the source’s arrows are easy to read in the opposite direction.

- The two-player network is an exact specialization of the Galeotti–Golub–Goyal research model. The equilibrium is4/3 for each player; the series is a derivation, not copied lecture content.

- Competitive-search p-values are fully transcribed for the aggregate and six industries. Values printed as0 are rounded. The original log-likelihoods and LR statistics remain in the source.

- The HANK system preserves all20 dependencies from the source. Seven computations and three targets are rebuilt as diagrams and an input/output ledger; the original graph is not repeated on the better side.

- The carbon-tax response is digitized from the published raster plot. The rebuilt chart retains both67% and95% bands, horizons0–6 and a zero line. Its tighter vertical scale is explicit.

## Search and revision record

The first exploration screened19 distinct public decks. The subsequent pass removed the NBER methods lecture, the NBER network lecture, and the trade lecture, and replaced two network-heavy cases with finance and health-insurance research. Additional primary research talks were screened for question placement and legible quantitative evidence.

The local research record contains source PDFs, selected page renders, exact data, candidate decisions, and separate content and design audits. Three agents researched source suitability, diagram arithmetic, and the revisions’ content/style.

### Research-talk replacements

# Research-talk replacements: source pins and integration notes

Ready case data: `case-proposals.json`. Exact originals and SHA-256 pins: `verified-assets.json`.
The proposals describe new HTML/SVG/math renderers; after panels must not use original-image crops.

## 02 — Gertler–Kiyotaki

[Primary slide deck](https://www.cirje.e.u-tokyo.ac.jp/research/workshops/macro/macropaper10/macro0622slides.pdf), **Financial Intermediation and Credit Policy**, Mark Gertler and Nobuhiro Kiyotaki. The [CIRJE seminar archive](https://www.cirje.e.u-tokyo.ac.jp/research/workshops/macro/macro2010.html) identifies Kiyotaki’s research presentation on **June 22, 2010**, 16:50–18:30. The archive’s longer title ends “in Business Cycle Analysis”; retain the deck’s own title in gallery attribution.

Use **PDF p. 6** (`gertler-kiyotaki-p6.png`) as before. Sequence checked: p. 2 motivation; pp. 3–5 crisis figures; p. 6 production/accounting; pp. 7–9 households/producers; p. 10 banking timing; pp. 11–12 funds-flow diagrams; p. 13 incentive constraint. No repeated build of p. 6 is visible. Critique the local entrance, not missing motivation throughout the talk.

After: question plus simple interbank flow, followed by the labeled funding identity. **Exact identity:** `Q_t^h s_t^h = n_t^h + b_t^h + d_t`, `h=i,n`. Interbank borrowing is signed; negative means lending. Deposits precede realization of the local opportunity. Do not add default, runs, policy-effect estimates, or numeric examples. The optional incentive equation is unnecessary for this case.

Visual checks also resolve p. 6’s resource equation: `Y_t=C_t+[1+f(I_t/I_{t-1})]I_t+G_t` — no “−1” inside f. It need not appear in the after.

## 06 — Silva

Use **PDF p. 58, printed 14/17**, `silva-p58.png`, from André Silva’s **November 19, 2015** presentation at the **4th EBA Policy Research Workshop**. [Event and deck listing](https://www.eba.europa.eu/publications-and-media/events/4th-annual-research-workshop-financial-regulation-and-real-economy); exact PDF link is in JSON. This is an actual empirical banking research talk. Earlier pages contain explicit questions, identification, and progressive highlighting; p. 58 is a single table, not a collapsed build.

Select **slide column 2**, liquidity creation with bank/year fixed effects. The companion September 2015 paper **PDF p. 50, Table 7, column 2** confirms every coefficient, bank-clustered robust SE, sample count, and recipient/peer direction. Original blue rows already convey significance. The repair makes interval width visible.

| Responding banks | Peers | Estimate | SE | Approx. 95% interval | N |
|---|---|---:|---:|---:|---:|
| Large | Large | .773 | .179 | [.42216, 1.12384] | 3,334 |
| Large | Small | .045 | .293 | [−.52928, .61928] | 3,108 |
| Small | Small | .803 | .373 | [.07192, 1.53408] | 2,946 |
| Small | Large | .886 | .192 | [.50968, 1.26232] | 3,184 |

Intervals are new normal-approximation displays, not source-reported bounds. **Do not interpret the original arrows as influence direction.** “Large → Small” means large banks responding to small peers. Liquidity creation is a balance-sheet measure normalized by total assets; selected coefficients are slopes in that measure. The other outcome uses a logistic transform—avoid a percentage-point interpretation of those unused columns. No pairwise coefficient-difference test is supplied.

## Bounded search and rejected alternatives

- **de Bandt–Chahad, EBA 2015**: genuine DSGE research talk; already states motivation and main conclusions before the model. Poor fit for Hidden question. Download retained.
- **Grill–Lang–Smith, EBA 2015**: genuine leverage-ratio paper talk; p. 5 explicitly poses the risk-taking/loss-absorption tradeoff and p. 8 previews results. Poor fit for Hidden question. Tables on pp. 30–34 omit standard errors, so no invented CIs. Download retained.
- **Silva, EBA 2015**: explicit early questions; use its table for uncertainty instead.
- **Brunnermeier–Sannikov, I-Theory of Money, Princeton 2011/Norges Bank 2013**: purpose and staged conceptual diagrams precede the formal setup; weaker match.
- **He–Krishnamurthy, MFM intermediary-asset-pricing PDF**: a journal article with a cover page, not a talk deck. Rejected.

Both recommended originals are primary-hosted critical excerpts, with attribution and page links. No explicit open license was found; do not assert permission or endorsement. All critiques concern what is visible in a deck, not the speaker’s delivery. No Site files were edited.


### Health-insurance selection

# Replace case 04 with an actual health-insurance research talk

**Recommendation:** Use the real insurance contract on physical PDF p. 20 before the abstract budget diagram on p. 4. This is an example-first repair of a research presentation, not a methods lecture.

**Source:** Amanda E. Kowalski, *Estimating the Tradeoff Between Risk Protection and Moral Hazard with a Nonlinear Budget Set Model of Health Insurance*, October 2012. [Author-hosted PDF](https://users.nber.org/~kowalski/nlbspres10_25_12.pdf), linked as “Slides” from her [research page](https://sites.lsa.umich.edu/amanda-kowalski/papers/). The title page gives October 2012; do not substitute the subsequent paper's 2015 publication date. The slides are the author's empirical research using a single employer's insurance data.

**Scope and fair context:** The original already states the welfare question on pp. 2–3 and previews observed/predicted spending on p. 5. It does not hide its research purpose. The narrower opportunity is that a symbol-heavy generic contract diagram appears on p. 4, while the actual contract parameters arrive on p. 20. A specific contract makes the later generalization easier to follow.



### Earlier candidate search (historical)



### Findings and limits: six inspected decks

| Public deck | Pages examined for the issue | Selection decision |
|---|---|---|
| [Elite Capture of Foreign Aid](https://thedocs.worldbank.org/en/doc/605901583339487690-0050022020/render/EliteCaptureofForeignAid.pdf) | 11–12,27–42 | Selected 39. A clear local topic-title example;40 already has an informative title. |
| [Metcalf–Stock, Europe’s Carbon Taxes](https://www.frbsf.org/economic-research/wp-content/uploads/sites/4/Stock-FRBSF-Seminar-071620.pdf) | 21–41, especially 25,39,40 | Selected 40 with narrower closing-slide diagnosis. Retain 25’s exact GDP-level plot;39 contains a different GDP-growth display. |
| [Building Changes, mental health and housing insecurity](https://buildingchanges.org/wp-content/uploads/2022/11/HYS-Mental-Health-Presentation_FINAL_11.14.22.pdf) | 6–16 | Useful early-caveat analogue, but this is a published slide-format resource; a delivered talk was not verified. |
| [Census, parental transitions and child well-being](https://www.census.gov/content/dam/Census/library/working-papers/2021/demo/sehsd-wp2021-06-presentation.pdf) | 12–15 | Topic title and limits are visible, but the outcome coding and interpretation are not clear enough for a faithful quantitative reconstruction. |
| [Climate Policy Assessment Tool](https://thedocs.worldbank.org/en/doc/efa6a73b11820e895d10b976a2b7a203-0080012025/original/12-CPAT-Presentation-VMylonas.pdf) | 29,33,59,88–90 | Rejected as an early-caveats case:89 is reserve methodology, deliberately linked from the main narrative. |
| [Popp et al., Green Fiscal Push](https://www.brookings.edu/wp-content/uploads/2021/08/1a_BPEA-presentation-final-09_2021.pdf) | 8–16,24–33 | Weaker title case: later exported builds add interpretations and uncertainty statements. |

### Generality and diagrams: six inspected decks

| Public deck | Pages examined for the issue | Selection decision |
|---|---|---|
| [Acemoglu, Games over Networks](https://conference.nber.org/confer/2014/SI2014/ML/Acemoglu1.pdf) | 12–17 | Selected 14–15. The two-player example is an exact specialization of the source’s best responses. |
| [Sequence-Space Jacobian, archived author slides](https://raw.githubusercontent.com/shade-econ/sequence-jacobian/bcca2eff6041abc77d0a777e6c64f9ac6ff44305/docs/sequence_jacobian_slides.pdf) | 61,69–75 | Selected 72, printed 24. Simpler graphs are already taught; the revision addresses the jump into the richer two-asset graph. |
| [MIT 14.15 production networks](https://ocw.mit.edu/courses/14-15-networks-spring-2022/mit14_15s22_lec4.pdf) | 9–15 | Good alternate small-calculation case. The dense empirical network itself is not automatically a failure: its job may be to show overall heterogeneity. |
| [Acemoglu, Propagation of Shocks](https://conference.nber.org/confer/2014/SI2014/ML/Acemoglu2.pdf) | 4–6,9–13 | Feasible alternate, but a faithful small GDP example needs more equilibrium structure than the selected network game. |
| [Ghassibe, Monetary Policy and Production Networks](https://www.bcb.gov.br/conteudo/eventos/Documents/seminariodemetas/XXI/23m/Sparal2A.%20Monetary%20Policy%20and%20Production%20Networks%20an%20empirical%20investigation.pdf) | 11–16,39–43 | Rich alternate formula and six-panel response grid. Appendix context and a calibration-label inconsistency make it less suitable for a clean reconstruction. |
| [CAREC/ADB, Input-Output Analysis](https://estore.carecinstitute.org/wp-content/uploads/2020/04/Day-01_Session-01_Basic-Framework-of-IO-Analysis_Presentation.pdf) | 31–40 | Rejected as generality-first:37 supplies a worked numerical table immediately before the inverse on 38. |

The BIS contagion-methodology lead was not selected because its primary PDF could not be retrieved. The Harvard 2020 sequence-space copy was also inaccessible; the selected diagram comes from the authors’ archived July 2019 deck, with page references tied to that exact version.

### Whole-deck architecture: seven complete decks inspected

| Public deck | Main route and builds | Selection decision |
|---|---|---|
| [HANK, Warwick 2017](https://benjaminmoll.com/wp-content/uploads/2019/07/HANK_slides.pdf) | 41 pages; preview 4; synthesis 33; support 34–41 | Selected for re-entry. Dividers 10,14,19 name sections; the proposed bridges restore their purpose. |
| [Competitive Search,2009](https://www.minneapolisfed.org/economic-research/conferences/~/media/files/research/events/2009_11_19/slides/Presenter8-slides-MNFed.pdf) | 26 pages; preview 4; conclusion 20; reserve 21–26 | Selected for optional method depth. Preserve the aggregate exception in the complete tests on 24. |
| [NBER machine learning,2015](https://conference.nber.org/confer/2015/SI2015/ML/nber_slides.pdf) | 73 pages; three-page outline 2–4; no appendix divider | Selected for recurring example-first method chapters, not a claim that a survey has one central empirical finding. |
| [Furceri–Karras, tax changes and growth](https://www.ecb.europa.eu/events/pdf/conferences/ws_pubfinance/presentation_Furceri.pdf) | 18 pages; first results 9; conclusion 18 | Credible alternative: move the result preview ahead of the robustness menu. The selected search talk offers a clearer optional branch. |
| [Financial Frictions and the Wealth Distribution](https://raw.githubusercontent.com/jesusfv/financial-frictions/master/Slides_FFWD.pdf) | 52 pages; preview 3; model/solution/estimation 8–27 | Excluded from the gallery because a later corrigendum changes central numerical findings. |
| [Imbens, Interference and Complex Experiments](https://conference.nber.org/confer/2024/SI2024/GI.pdf) | 38 physical pages; references 34–38 | Positive counterexample: transitions 18,20,27,30 explain the changing task. |
| [Targeting Interventions in Networks](https://bengolub.net/wp-content/uploads/2020/09/TIN_slides.pdf) | 56 physical pages, many builds; synthesis 33–35; support 36–56 | Positive counterexample for late results: the large-budget theorem appears 13–14. Transition 18 already explains why the next case matters. |
