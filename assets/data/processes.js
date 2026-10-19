/* content/data/processes.js — Sơ đồ quy trình kho.
 *
 * Cấu trúc: lanes (quy trình) → groups (nhóm A / B, có thể không có nhãn) → steps (bước).
 *  Một bước:
 *    { title, icon: 'pda', systems: ['SAP','WMS','PDA'] hoặc { label, sys },
 *      bullets: [ 'chữ' | { sync: 'dòng đồng bộ' } ],
 *      cases: [ { tag: 'A', text, alert? } ],   // ô nhánh / ghi chú theo nhà máy
 *      optional: true,                          // viền nét đứt (bước chỉ áp dụng một trường hợp)
 *      wide: true }                             // ô rộng hơn
 *  Một quy trình (lane):
 *    { id, number, color: 'blue'|'green'|'orange'|'red'|'teal'|'indigo'|'purple'|'cyan'|'slate',
 *      title, subtitle, layout: 'stack' (nhóm xếp chồng) | 'row' (nhóm cùng hàng)
 *        | 'side' (nhóm đầu xếp lưới `cols` cột, mặc định 4, các nhóm sau thành cột dọc bên phải),
 *      numbering: 'group' (mỗi nhóm đánh số lại từ 1, mặc định) | 'lane' (đánh số liên tục),
 *      groups: [ { label?, color?, connector?: 'solid'|'dashed'|'none',
 *                  sublabel?, aside?: true (nhãn + sublabel thành cột bên trái nhóm),
 *                  steps: [...] } ], note? }
 *  Icon có sẵn: box check db factory gear list loc pda plan print req ret sync tag truck wh
 */
App.data('processes', {
  "lanes": [
    {
      "id": "p1",
      "number": "1",
      "color": "blue",
      "title": { "vi": "Quy trình mua", "en": "Purchasing process", "ko": "구매 프로세스" },
      "subtitle": { "vi": "Inbound từ NCC", "en": "Inbound from suppliers", "ko": "공급업체 입고" },
      "layout": "stack",
      "numbering": "lane",
      "groups": [
        {
          "steps": [
            {
              "title": { "vi": "Kế hoạch mua", "en": "Purchase plan", "ko": "구매 계획" },
              "icon": "plan",
              "systems": [
                {
                  "label": { "vi": "BP Mua", "en": "Purchasing dept.", "ko": "구매부서" },
                  "sys": "MANUAL"
                }
              ],
              "bullets": [
                { "vi": "BP Mua gửi → VP Kho", "en": "Purchasing sends → Warehouse office", "ko": "구매부서 → 창고 사무실 전달" },
                { "vi": "Kế hoạch mua theo tháng", "en": "Monthly purchase plan", "ko": "월간 구매 계획" },
                { "vi": "Kế hoạch mua theo ngày", "en": "Daily purchase plan", "ko": "일간 구매 계획" }
              ]
            },
            {
              "title": { "vi": "Yêu cầu mua", "en": "Purchase request", "ko": "구매 요청" },
              "icon": "req",
              "systems": [
                "WMS"
              ],
              "bullets": [
                { "vi": "Nhập / import yêu cầu nhập hàng vào WMS", "en": "Enter / import receipt requests into WMS", "ko": "WMS에 입고 요청 입력 / 업로드" },
                { "vi": "Không cần phê duyệt", "en": "No approval required", "ko": "승인 불필요" }
              ]
            },
            {
              "title": { "vi": "In tem", "en": "Print labels", "ko": "라벨 발행" },
              "icon": "print",
              "systems": [
                "WMS"
              ],
              "bullets": [
                { "vi": "In tem pallet theo cái", "en": "Print one label per pallet", "ko": "팔레트별 라벨 발행" },
                { "vi": "Tem định danh số lượng", "en": "Label identifies quantity", "ko": "라벨에 수량 식별" },
                { "vi": "1 pallet chỉ 1 loại hàng", "en": "1 pallet holds only 1 item", "ko": "팔레트 1개 = 품목 1종" },
                { "vi": "In từ lệnh nhập hàng, hoặc in lại tem khi nhận hàng khác lệnh", "en": "Print from the receipt order, or reprint when goods differ from the order", "ko": "입고 지시에서 발행, 지시와 다른 입고 시 재발행" }
              ]
            },
            {
              "title": { "vi": "Dán tem", "en": "Attach labels", "ko": "라벨 부착" },
              "icon": "tag",
              "systems": [
                {
                  "label": { "vi": "NCC / Dorco", "en": "Supplier / Dorco", "ko": "공급업체 / Dorco" },
                  "sys": "MANUAL"
                }
              ],
              "bullets": [
                { "vi": "Gửi NCC dán, hoặc", "en": "Sent to supplier to attach, or", "ko": "공급업체에 보내 부착, 또는" },
                { "vi": "Dorco tự dán", "en": "Dorco attaches them", "ko": "Dorco 자체 부착" }
              ]
            },
            {
              "title": { "vi": "Nhập hàng vào khu chờ", "en": "Receive to waiting area", "ko": "대기 구역 입고" },
              "icon": "box",
              "systems": [
                "PDA"
              ],
              "cases": [
                {
                  "tag": "HY",
                  "text": { "vi": "Kiểm số lượng, quét PDA nhập hàng vào khu chờ", "en": "Check quantity, scan with PDA to receive into the waiting area", "ko": "수량 확인 후 PDA 스캔으로 대기 구역에 입고" }
                }
              ]
            },
            {
              "title": { "vi": "Kiểm tra & QC", "en": "Inspection & QC", "ko": "검사 및 QC" },
              "icon": "check",
              "systems": [
                {
                  "label": "QC",
                  "sys": "MANUAL"
                }
              ],
              "cases": [
                {
                  "tag": "HY",
                  "text": { "vi": "Kiểm tra chất lượng hàng, dán nhãn QC", "en": "Check goods quality, attach the QC label", "ko": "품질 검사 후 QC 라벨 부착" },
                  "alert": { "vi": "Hàng NG → khu vực NG chờ xuất trả", "en": "NG goods → NG area awaiting return", "ko": "불량(NG)품 → NG 구역, 반품 대기" }
                },
                {
                  "tag": "HN",
                  "text": { "vi": "Kho kiểm số lượng, QC kiểm chất lượng tại cửa kho", "en": "Warehouse checks quantity, QC checks quality at the warehouse door", "ko": "창고는 수량, QC는 창고 입구에서 품질 검사" },
                  "alert": { "vi": "Hàng NG → khu vực NG chờ xuất trả. NG tách pallet thì phải tách tem", "en": "NG goods → NG area awaiting return. Splitting an NG pallet requires splitting the label", "ko": "불량(NG)품 → NG 구역, 반품 대기. NG 팔레트 분할 시 라벨도 분할" }
                }
              ]
            },
            {
              "title": { "vi": "Nhập hàng vào vị trí", "en": "Put away to location", "ko": "로케이션 적치" },
              "icon": "loc",
              "systems": [
                "PDA"
              ],
              "cases": [
                {
                  "tag": "HY",
                  "text": { "vi": "Quét PDA chuyển hàng từ sàn vào vị trí lưu kho", "en": "Scan with PDA to move goods from the floor to the storage location", "ko": "PDA 스캔으로 바닥에서 보관 로케이션으로 이동" }
                },
                {
                  "tag": "HN",
                  "text": { "vi": "Quét PDA nhập hàng vào vị trí lưu kho", "en": "Scan with PDA to receive goods into the storage location", "ko": "PDA 스캔으로 보관 로케이션에 입고" }
                }
              ]
            },
            {
              "title": { "vi": "Phiếu nhập kho", "en": "Goods receipt note", "ko": "입고전표" },
              "icon": "check",
              "systems": [
                "WMS",
                "SAP"
              ],
              "bullets": [
                { "vi": "Hệ thống tự sinh phiếu nhập kho chờ duyệt", "en": "System auto-creates a receipt note pending approval", "ko": "시스템이 입고전표 자동 생성 (승인 대기)" },
                { "vi": "VP Kho kiểm tra & duyệt trên WMS", "en": "Warehouse office reviews & approves in WMS", "ko": "창고 사무실이 WMS에서 검토·승인" },
                {
                  "sync": { "vi": "WMS đồng bộ phiếu nhập kho sang SAP", "en": "WMS syncs the receipt note to SAP", "ko": "WMS가 입고전표를 SAP로 연동" }
                }
              ]
            }
          ]
        },
        {
          "label": { "vi": "Nhánh hàng NG", "en": "NG branch", "ko": "NG 분기" },
          "sublabel": { "vi": "Phát sinh từ bước 6 (QC) → trả NCC", "en": "Arises at step 6 (QC) → return to supplier", "ko": "6단계(QC)에서 발생 → 공급업체 반품" },
          "aside": true,
          "steps": [
            {
              "title": { "vi": "Yêu cầu trả lại hàng", "en": "Return request", "ko": "반품 요청" },
              "icon": "ret",
              "systems": [
                "WMS"
              ],
              "bullets": [
                { "vi": "Tạo yêu cầu trả hàng trên WMS", "en": "Create return request in WMS", "ko": "WMS에서 반품 요청 생성" },
                { "vi": "Không cần phê duyệt", "en": "No approval required", "ko": "승인 불필요" }
              ]
            },
            {
              "title": { "vi": "Xuất hàng trả lại", "en": "Return shipment", "ko": "반품 출고" },
              "icon": "truck",
              "systems": [
                "PDA"
              ],
              "bullets": [
                { "vi": "Quét PDA xuất hàng trả lại", "en": "Scan with PDA to ship the returned goods", "ko": "PDA 스캔으로 반품 출고" }
              ]
            },
            {
              "title": { "vi": "Phiếu xuất kho", "en": "Goods issue note", "ko": "출고전표" },
              "icon": "check",
              "systems": [
                "WMS",
                "SAP"
              ],
              "bullets": [
                { "vi": "Hệ thống tự sinh phiếu xuất kho chờ duyệt", "en": "System auto-creates an issue note pending approval", "ko": "시스템이 출고전표 자동 생성 (승인 대기)" },
                { "vi": "VP Kho duyệt phiếu trên WMS", "en": "Warehouse office approves the note in WMS", "ko": "창고 사무실이 WMS에서 전표 승인" },
                {
                  "sync": { "vi": "WMS đồng bộ phiếu xuất kho về SAP", "en": "WMS syncs the issue note to SAP", "ko": "WMS가 출고전표를 SAP로 연동" }
                }
              ]
            }
          ],
          "color": "red",
          "connector": "dashed"
        }
      ]
    },
    {
      "id": "p2",
      "number": "2",
      "color": "green",
      "title": { "vi": "Quy trình nhập xuất dùng", "en": "Production issue & return process", "ko": "생산 출고·반납 프로세스" },
      "subtitle": { "vi": "Cấp Nguyên vật liệu cho sản xuất", "en": "Supplying materials to production", "ko": "생산용 원자재 공급" },
      "layout": "row",
      "numbering": "lane",
      "groups": [
        {
          "label": { "vi": "Xuất Nguyên vật liệu cho sản xuất", "en": "Issue materials to production", "ko": "생산 원자재 출고" },
          "steps": [
            {
              "title": { "vi": "Yêu cầu xuất Nguyên vật liệu", "en": "Material issue request", "ko": "원자재 출고 요청" },
              "icon": "factory",
              "systems": [
                "SAP",
                "WMS"
              ],
              "bullets": [
                { "vi": "BP Sản xuất tạo yêu cầu trên SAP", "en": "Production creates the request in SAP", "ko": "생산부서가 SAP에서 요청 생성" },
                {
                  "sync": { "vi": "Đồng bộ sang WMS", "en": "Synced to WMS", "ko": "WMS로 연동" }
                }
              ]
            },
            {
              "title": { "vi": "Xuất kho Nguyên vật liệu", "en": "Material issue", "ko": "원자재 출고" },
              "icon": "pda",
              "systems": [
                "PDA"
              ],
              "bullets": [
                { "vi": "BP Kho dùng PDA xuất hàng theo phiếu yêu cầu", "en": "Warehouse issues with PDA per the request", "ko": "창고가 요청서에 따라 PDA로 출고" },
                { "vi": "Cho phép xuất lẻ pallet", "en": "Partial pallet issue allowed", "ko": "팔레트 부분 출고 가능" },
                { "vi": "Có thể xuất ít hơn / nhiều hơn → sửa phiếu yêu cầu", "en": "May issue less / more → adjust the request", "ko": "요청보다 적게/많게 출고 가능 → 요청서 수정" },
                { "vi": "Hệ thống trừ dần số lượng còn lại trên tem", "en": "System deducts remaining qty on the label", "ko": "시스템이 라벨 잔량을 차감" }
              ],
              "wide": true
            },
            {
              "title": { "vi": "Phiếu xuất kho Nguyên vật liệu", "en": "Material issue note", "ko": "원자재 출고전표" },
              "icon": "check",
              "systems": [
                "WMS",
                "SAP"
              ],
              "bullets": [
                { "vi": "Sau khi xuất bằng PDA, hệ thống tự sinh phiếu xuất kho chờ duyệt", "en": "After PDA issue, system auto-creates an issue note pending approval", "ko": "PDA 출고 후 시스템이 출고전표 자동 생성 (승인 대기)" },
                { "vi": "VP Kho kiểm tra & duyệt trên WMS", "en": "Warehouse office reviews & approves in WMS", "ko": "창고 사무실이 WMS에서 검토·승인" },
                {
                  "sync": { "vi": "WMS đồng bộ phiếu sang SAP", "en": "WMS syncs the note to SAP", "ko": "WMS가 전표를 SAP로 연동" }
                }
              ]
            }
          ]
        },
        {
          "label": { "vi": "Trả lại Nguyên vật liệu dư về kho", "en": "Return surplus material to warehouse", "ko": "잔여 원자재 창고 반납" },
          "steps": [
            {
              "title": { "vi": "Yêu cầu trả lại Nguyên vật liệu", "en": "Material return request", "ko": "원자재 반납 요청" },
              "icon": "ret",
              "systems": [
                "SAP",
                "WMS"
              ],
              "bullets": [
                { "vi": "BP Sản xuất tạo yêu cầu trên SAP", "en": "Production creates the request in SAP", "ko": "생산부서가 SAP에서 요청 생성" },
                {
                  "sync": { "vi": "Đồng bộ sang WMS", "en": "Synced to WMS", "ko": "WMS로 연동" }
                }
              ]
            },
            {
              "title": { "vi": "In tem / dán tem", "en": "Print / attach labels", "ko": "라벨 발행 / 부착" },
              "icon": "print",
              "systems": [
                {
                  "label": { "vi": "BP Sản xuất", "en": "Production dept.", "ko": "생산부서" },
                  "sys": "MANUAL"
                }
              ],
              "bullets": [
                { "vi": "Áp dụng khi trả lại hàng dở kiện", "en": "Applies to partial-pack returns", "ko": "부분 포장 반납 시 적용" },
                { "vi": "BP Sản xuất in tem & dán tem mới cho hàng trả lại", "en": "Production prints & attaches new labels to returned goods", "ko": "생산부서가 반납품에 새 라벨 발행·부착" }
              ]
            },
            {
              "title": { "vi": "Nhập kho Nguyên vật liệu trả lại", "en": "Receive returned material", "ko": "반납 원자재 입고" },
              "icon": "pda",
              "systems": [
                "PDA"
              ],
              "bullets": [
                { "vi": "BP Sản xuất giao trả hàng cho kho", "en": "Production hands goods back to warehouse", "ko": "생산부서가 창고에 반납" },
                { "vi": "BP Kho dùng PDA nhập hàng trả lại", "en": "Warehouse receives returns with PDA", "ko": "창고가 PDA로 반납품 입고" }
              ]
            },
            {
              "title": { "vi": "Phiếu nhập kho trả lại Nguyên vật liệu", "en": "Material return receipt note", "ko": "원자재 반납 입고전표" },
              "icon": "check",
              "systems": [
                "WMS",
                "SAP"
              ],
              "bullets": [
                { "vi": "Hệ thống tự sinh phiếu nhập chờ duyệt sau khi kho nhập bằng PDA", "en": "System auto-creates a receipt note pending approval after PDA receipt", "ko": "PDA 입고 후 시스템이 입고전표 자동 생성 (승인 대기)" },
                { "vi": "VP Kho kiểm tra & duyệt trên WMS", "en": "Warehouse office reviews & approves in WMS", "ko": "창고 사무실이 WMS에서 검토·승인" },
                {
                  "sync": { "vi": "WMS đồng bộ phiếu sang SAP", "en": "WMS syncs the note to SAP", "ko": "WMS가 전표를 SAP로 연동" }
                }
              ]
            }
          ],
          "connector": "solid"
        }
      ]
    },
    {
      "id": "p3",
      "number": "3",
      "color": "orange",
      "title": { "vi": "Quy trình gia công", "en": "Outsourcing process", "ko": "외주가공 프로세스" },
      "subtitle": { "vi": "Xuất đi & nhận về", "en": "Send out & receive back", "ko": "출고 및 회수 입고" },
      "layout": "row",
      "numbering": "lane",
      "groups": [
        {
          "label": { "vi": "Xuất hàng đi gia công", "en": "Ship goods for processing", "ko": "외주가공 출고" },
          "steps": [
            {
              "title": { "vi": "Yêu cầu xuất hàng đi gia công", "en": "Outsourcing issue request", "ko": "외주가공 출고 요청" },
              "icon": "req",
              "systems": [
                "WMS"
              ],
              "bullets": [
                { "vi": "Dựa vào PR gia công", "en": "Based on the outsourcing PR", "ko": "외주가공 PR 기준" },
                { "vi": "Người dùng tạo yêu cầu trên WMS", "en": "User creates the request in WMS", "ko": "사용자가 WMS에서 요청 생성" }
              ]
            },
            {
              "title": { "vi": "Xuất kho hàng gia công", "en": "Outsourcing goods issue", "ko": "외주가공품 출고" },
              "icon": "pda",
              "systems": [
                "PDA"
              ],
              "bullets": [
                { "vi": "Có thể xuất lẻ pallet (hệ thống trừ đuổi số lượng còn lại trên tem)", "en": "Partial pallet issue allowed (the system deducts the remaining quantity on the label)", "ko": "팔레트 부분 출고 가능 (시스템이 라벨의 잔량을 차감)" }
              ],
              "wide": true
            },
            {
              "title": { "vi": "Phiếu xuất kho hàng gia công", "en": "Outsourcing issue note", "ko": "외주가공 출고전표" },
              "icon": "check",
              "systems": [
                "WMS",
                "SAP"
              ],
              "bullets": [
                { "vi": "Sau khi xuất bằng PDA, hệ thống tự sinh phiếu xuất kho chờ duyệt", "en": "After PDA issue, system auto-creates an issue note pending approval", "ko": "PDA 출고 후 시스템이 출고전표 자동 생성 (승인 대기)" },
                { "vi": "VP Kho kiểm tra & duyệt trên WMS", "en": "Warehouse office reviews & approves in WMS", "ko": "창고 사무실이 WMS에서 검토·승인" },
                {
                  "sync": { "vi": "WMS đồng bộ phiếu sang SAP", "en": "WMS syncs the note to SAP", "ko": "WMS가 전표를 SAP로 연동" }
                }
              ]
            }
          ]
        },
        {
          "label": { "vi": "Nhập hàng gia công về", "en": "Receive processed goods", "ko": "외주가공품 입고" },
          "steps": [
            {
              "title": { "vi": "Yêu cầu nhập hàng gia công về", "en": "Processed goods receipt request", "ko": "외주가공품 입고 요청" },
              "icon": "gear",
              "systems": [
                "WMS"
              ],
              "bullets": [
                { "vi": "Tạo yêu cầu trên WMS", "en": "Create the request in WMS", "ko": "WMS에서 요청 생성" },
                { "vi": "In tem mới cho hàng nhận về", "en": "Print new labels for received goods", "ko": "입고품 새 라벨 발행" }
              ]
            },
            {
              "title": { "vi": "Nhập kho hàng gia công về", "en": "Processed goods receipt", "ko": "외주가공품 입고" },
              "icon": "pda",
              "systems": [
                "PDA"
              ],
              "bullets": [
                { "vi": "BP Kho dùng PDA nhập hàng", "en": "Warehouse receives with PDA", "ko": "창고가 PDA로 입고" }
              ]
            },
            {
              "title": { "vi": "Phiếu nhập kho hàng gia công về", "en": "Processed goods receipt note", "ko": "외주가공품 입고전표" },
              "icon": "check",
              "systems": [
                "WMS",
                "SAP"
              ],
              "bullets": [
                { "vi": "Hệ thống tự sinh phiếu nhập kho chờ duyệt", "en": "System auto-creates a receipt note pending approval", "ko": "시스템이 입고전표 자동 생성 (승인 대기)" },
                { "vi": "VP Kho kiểm tra & duyệt trên WMS", "en": "Warehouse office reviews & approves in WMS", "ko": "창고 사무실이 WMS에서 검토·승인" },
                {
                  "sync": { "vi": "WMS đồng bộ phiếu sang SAP", "en": "WMS syncs the note to SAP", "ko": "WMS가 전표를 SAP로 연동" }
                }
              ]
            }
          ],
          "connector": "solid"
        }
      ],
      "note": { "vi": "Vật tư tiêu hao không theo dõi trên SAP.", "en": "Consumables are not tracked in SAP.", "ko": "소모품은 SAP에서 관리하지 않음." }
    },
    {
      "id": "p4",
      "number": "4",
      "color": "teal",
      "title": { "vi": "Quy trình nhập kho thành phẩm", "en": "Finished goods receipt process", "ko": "완제품 입고 프로세스" },
      "subtitle": { "vi": "Từ sản xuất vào kho Thành phẩm", "en": "From production to FG warehouse", "ko": "생산 → 완제품 창고" },
      "layout": "stack",
      "groups": [
        {
          "steps": [
            {
              "title": { "vi": "Yêu cầu nhập kho Thành phẩm", "en": "FG receipt request", "ko": "완제품 입고 요청" },
              "icon": "factory",
              "systems": [
                "SAP",
                "WMS"
              ],
              "bullets": [
                { "vi": "Lập lệnh yêu cầu nhập kho thành phẩm trên SAP", "en": "Create the FG receipt request in SAP", "ko": "SAP에서 완제품 입고 요청 생성" },
                {
                  "sync": { "vi": "Đồng bộ lệnh sang WMS", "en": "Request synced to WMS", "ko": "요청 WMS 연동" }
                }
              ]
            },
            {
              "title": { "vi": "In & dán tem Thành phẩm", "en": "Print & attach FG labels", "ko": "완제품 라벨 발행·부착" },
              "icon": "print",
              "systems": [
                "WMS"
              ],
              "bullets": [
                { "vi": "Phát hành tem nhãn thành phẩm", "en": "Issue finished goods labels", "ko": "완제품 라벨 발행" },
                { "vi": "Dán vào pallet thành phẩm", "en": "Attach to FG pallets", "ko": "완제품 팔레트에 부착" }
              ]
            },
            {
              "title": { "vi": "Quét tem nhập kho", "en": "Scan to receive", "ko": "라벨 스캔 입고" },
              "icon": "pda",
              "systems": [
                "PDA"
              ],
              "bullets": [
                { "vi": "Quét tem nhãn thành phẩm", "en": "Scan finished goods labels", "ko": "완제품 라벨 스캔" },
                { "vi": "WMS tự sinh phiếu nhập kho thành phẩm", "en": "WMS auto-creates the FG receipt note", "ko": "WMS가 완제품 입고전표 자동 생성" }
              ]
            },
            {
              "title": { "vi": "Duyệt phiếu nhập", "en": "Approve receipt note", "ko": "입고전표 승인" },
              "icon": "check",
              "systems": [
                "WMS",
                "SAP"
              ],
              "bullets": [
                { "vi": "Duyệt phiếu nhập kho thành phẩm", "en": "Approve the FG receipt note", "ko": "완제품 입고전표 승인" },
                { "vi": "WMS tăng tồn kho thành phẩm", "en": "WMS increases FG stock", "ko": "WMS 완제품 재고 증가" },
                {
                  "sync": { "vi": "Đồng bộ kết quả sang SAP", "en": "Results synced to SAP", "ko": "결과 SAP 연동" }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "p5",
      "number": "5",
      "color": "indigo",
      "title": { "vi": "Quy trình bán hàng", "en": "Sales process", "ko": "판매 프로세스" },
      "subtitle": { "vi": "Xuất bán & trả hàng thành phẩm", "en": "FG sales & returns", "ko": "완제품 판매 및 반품" },
      "layout": "stack",
      "groups": [
        {
          "label": { "vi": "A. Xuất bán thành phẩm", "en": "A. Finished goods sales", "ko": "A. 완제품 판매 출고" },
          "steps": [
            {
              "title": { "vi": "Đơn bán hàng nội bộ", "en": "Internal sales order", "ko": "내부 판매오더" },
              "icon": "req",
              "systems": [
                "SAP",
                "WMS"
              ],
              "bullets": [
                { "vi": "Lập đơn bán hàng nội bộ (VinaSO) trên SAP", "en": "Create the internal sales order (VinaSO) in SAP", "ko": "SAP에서 내부 판매오더(VinaSO) 생성" },
                {
                  "sync": { "vi": "Đồng bộ đơn sang WMS", "en": "Order synced to WMS", "ko": "오더 WMS 연동" }
                }
              ]
            },
            {
              "title": { "vi": "Lệnh giao hàng", "en": "Delivery order", "ko": "출하 지시" },
              "icon": "plan",
              "systems": [
                "WMS"
              ],
              "bullets": [
                { "vi": "Lập lệnh giao hàng trên WMS từ đơn bán hàng đã đồng bộ", "en": "Create the delivery order in WMS from the synced sales order", "ko": "연동된 판매오더로 WMS 출하 지시 생성" },
                { "vi": "Gán mã vạch tem nhãn cho từng mã hàng", "en": "Assign label barcodes to each item", "ko": "품목별 라벨 바코드 지정" }
              ]
            },
            {
              "title": { "vi": "Quét tem giao hàng", "en": "Scan to ship", "ko": "라벨 스캔 출하" },
              "icon": "pda",
              "systems": [
                "PDA"
              ],
              "bullets": [
                { "vi": "Quét tem nhãn thành phẩm giao hàng", "en": "Scan the FG labels being shipped", "ko": "출하 완제품 라벨 스캔" },
                { "vi": "WMS tự sinh phiếu giao hàng thành phẩm", "en": "WMS auto-creates the FG delivery note", "ko": "WMS가 완제품 출하전표 자동 생성" }
              ]
            },
            {
              "title": { "vi": "Duyệt phiếu giao hàng", "en": "Approve delivery note", "ko": "출하전표 승인" },
              "icon": "check",
              "systems": [
                "WMS",
                "SAP"
              ],
              "bullets": [
                { "vi": "Duyệt phiếu giao hàng thành phẩm", "en": "Approve the FG delivery note", "ko": "완제품 출하전표 승인" },
                { "vi": "WMS giảm tồn kho thành phẩm", "en": "WMS decreases FG stock", "ko": "WMS 완제품 재고 감소" },
                {
                  "sync": { "vi": "Đồng bộ kết quả sang SAP", "en": "Results synced to SAP", "ko": "결과 SAP 연동" }
                }
              ]
            }
          ]
        },
        {
          "label": { "vi": "B. Trả hàng thành phẩm", "en": "B. Finished goods returns", "ko": "B. 완제품 반품" },
          "steps": [
            {
              "title": { "vi": "Yêu cầu trả hàng", "en": "Return request", "ko": "반품 요청" },
              "icon": "ret",
              "systems": [
                "WMS"
              ],
              "bullets": [
                { "vi": "Lập yêu cầu trả hàng trên WMS (từ phiếu giao hàng thành phẩm đã lập hoặc tạo thủ công)", "en": "Create the return request in WMS (from an existing FG delivery note or manually)", "ko": "WMS에서 반품 요청 생성 (기존 완제품 출하전표 기준 또는 수동 생성)" }
              ],
              "cases": [
                {
                  "tag": "A",
                  "text": { "vi": "TH không tận dụng tem cũ → bước 2", "en": "Old labels not reused → step 2", "ko": "기존 라벨 미사용 → 2단계" }
                },
                {
                  "tag": "B",
                  "text": { "vi": "TH tận dụng tem cũ → bước 3", "en": "Old labels reused → step 3", "ko": "기존 라벨 재사용 → 3단계" }
                }
              ]
            },
            {
              "title": { "vi": "In tem Thành phẩm mới", "en": "Print new FG labels", "ko": "완제품 새 라벨 발행" },
              "icon": "print",
              "systems": [
                "WMS"
              ],
              "bullets": [
                { "vi": "Phát hành tem nhãn thành phẩm mới cho hàng nhận trả lại", "en": "Issue new FG labels for returned goods", "ko": "반품 입고품에 새 완제품 라벨 발행" },
                { "vi": "Chỉ áp dụng trường hợp tạo tem mới", "en": "Only when creating new labels", "ko": "새 라벨을 발행하는 경우에만 적용" }
              ],
              "optional": true
            },
            {
              "title": { "vi": "Phiếu trả hàng Thành phẩm", "en": "FG return note", "ko": "완제품 반품전표" },
              "icon": "check",
              "systems": [
                "WMS"
              ],
              "bullets": [
                { "vi": "Lập phiếu trả hàng thành phẩm trên WMS, kho hàng trả lại, ở vị trí tạm", "en": "Create the FG return note in WMS, returns warehouse, at a temporary location", "ko": "WMS에서 완제품 반품전표 생성, 반품 창고, 임시 로케이션" },
                { "vi": "Ở bước này chỉ làm thủ tục trước, hàng chưa về", "en": "This step only handles the paperwork in advance; the goods have not arrived yet", "ko": "이 단계에서는 서류 절차만 먼저 진행하며 실물은 아직 입고되지 않음" }
              ]
            },
            {
              "title": { "vi": "Duyệt phiếu trả hàng", "en": "Approve return note", "ko": "반품전표 승인" },
              "icon": "check",
              "systems": [
                "WMS",
                "SAP"
              ],
              "bullets": [
                { "vi": "Duyệt phiếu trả hàng thành phẩm", "en": "Approve the FG return note", "ko": "완제품 반품전표 승인" },
                { "vi": "WMS tăng tồn kho thành phẩm", "en": "WMS increases FG stock", "ko": "WMS 완제품 재고 증가" },
                {
                  "sync": { "vi": "Đồng bộ kết quả nhập kho hàng trả lại sang SAP", "en": "Return receipt results synced to SAP", "ko": "반품 입고 결과 SAP 연동" }
                }
              ]
            },
            {
              "title": { "vi": "Hàng thực tế về", "en": "Goods physically arrive", "ko": "실물 입고" },
              "icon": "loc",
              "systems": [
                "PDA"
              ],
              "bullets": [
                { "vi": "Quét QR tem, chuyển từ vị trí tạm sang vị trí nhập thực tế", "en": "Scan the QR label and move from the temporary to the actual location", "ko": "QR 라벨 스캔 후 임시 로케이션 → 실제 로케이션 이동" }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "p6",
      "number": "6",
      "color": "purple",
      "title": { "vi": "Quy trình nhập xuất khác", "en": "Other receipts & issues process", "ko": "기타 입출고 프로세스" },
      "subtitle": { "vi": "Nhập khác · xuất mẫu, xuất hủy", "en": "Other receipts · samples, disposal", "ko": "기타 입고 · 샘플·폐기 출고" },
      "layout": "row",
      "groups": [
        {
          "label": { "vi": "A. Nhập khác", "en": "A. Other receipts", "ko": "A. 기타 입고" },
          "steps": [
            {
              "title": { "vi": "Yêu cầu nhập khác", "en": "Other receipt request", "ko": "기타 입고 요청" },
              "icon": "req",
              "systems": [
                "WMS"
              ],
              "bullets": [
                { "vi": "Lập lệnh yêu cầu nhập trên WMS", "en": "Create the receipt request in WMS", "ko": "WMS에서 입고 요청 생성" }
              ]
            },
            {
              "title": { "vi": "In & dán tem", "en": "Print & attach labels", "ko": "라벨 발행·부착" },
              "icon": "print",
              "systems": [
                "WMS"
              ],
              "bullets": [
                { "vi": "Phát hành tem nhãn", "en": "Issue labels", "ko": "라벨 발행" },
                { "vi": "Dán vào mặt hàng", "en": "Attach to the items", "ko": "품목에 부착" }
              ]
            },
            {
              "title": { "vi": "Quét tem nhập kho", "en": "Scan to receive", "ko": "라벨 스캔 입고" },
              "icon": "pda",
              "systems": [
                "PDA"
              ],
              "bullets": [
                { "vi": "Quét tem nhãn mặt hàng", "en": "Scan item labels", "ko": "품목 라벨 스캔" },
                { "vi": "WMS tự sinh phiếu nhập kho mặt hàng", "en": "WMS auto-creates the item receipt note", "ko": "WMS가 품목 입고전표 자동 생성" }
              ]
            },
            {
              "title": { "vi": "Duyệt phiếu nhập", "en": "Approve receipt note", "ko": "입고전표 승인" },
              "icon": "check",
              "systems": [
                "WMS",
                "SAP"
              ],
              "bullets": [
                { "vi": "Duyệt phiếu nhập kho mặt hàng", "en": "Approve the item receipt note", "ko": "품목 입고전표 승인" },
                { "vi": "WMS tăng tồn kho mặt hàng", "en": "WMS increases item stock", "ko": "WMS 품목 재고 증가" },
                {
                  "sync": { "vi": "Đồng bộ kết quả sang SAP", "en": "Results synced to SAP", "ko": "결과 SAP 연동" }
                }
              ]
            }
          ]
        },
        {
          "label": { "vi": "B. Xuất khác", "en": "B. Other issues", "ko": "B. 기타 출고" },
          "connector": "none",
          "steps": [
            {
              "title": { "vi": "Yêu cầu xuất mẫu / hủy", "en": "Sample / disposal request", "ko": "샘플·폐기 출고 요청" },
              "icon": "req",
              "systems": [
                "SAP",
                "WMS"
              ],
              "bullets": [
                { "vi": "Lập lệnh yêu cầu xuất mẫu, xuất hủy trên SAP", "en": "Create the sample / disposal issue request in SAP", "ko": "SAP에서 샘플·폐기 출고 요청 생성" },
                {
                  "sync": { "vi": "Đồng bộ lệnh sang WMS", "en": "Request synced to WMS", "ko": "요청 WMS 연동" }
                }
              ]
            },
            {
              "title": { "vi": "Quét tem xuất", "en": "Scan to issue", "ko": "라벨 스캔 출고" },
              "icon": "pda",
              "systems": [
                "PDA"
              ],
              "bullets": [
                { "vi": "Quét tem nhãn mẫu cần hủy", "en": "Scan labels of samples / items to dispose", "ko": "샘플·폐기 대상 라벨 스캔" },
                { "vi": "WMS tự sinh phiếu xuất kho", "en": "WMS auto-creates the issue note", "ko": "WMS가 출고전표 자동 생성" }
              ]
            },
            {
              "title": { "vi": "Duyệt phiếu xuất", "en": "Approve issue note", "ko": "출고전표 승인" },
              "icon": "check",
              "systems": [
                "WMS",
                "SAP"
              ],
              "bullets": [
                { "vi": "Duyệt phiếu xuất kho", "en": "Approve the issue note", "ko": "출고전표 승인" },
                { "vi": "WMS giảm tồn kho", "en": "WMS decreases stock", "ko": "WMS 재고 감소" },
                {
                  "sync": { "vi": "Đồng bộ kết quả sang SAP", "en": "Results synced to SAP", "ko": "결과 SAP 연동" }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "p7",
      "number": "7",
      "color": "cyan",
      "title": { "vi": "Quy trình chuyển kho", "en": "Transfer process", "ko": "창고 이동 프로세스" },
      "subtitle": { "vi": "Chuyển kho · chuyển vị trí", "en": "Warehouse transfer · location move", "ko": "창고 이동 · 로케이션 이동" },
      "layout": "stack",
      "groups": [
        {
          "label": { "vi": "A. Chuyển sang kho khác", "en": "A. Transfer to another warehouse", "ko": "A. 타 창고 이동" },
          "steps": [
            {
              "title": { "vi": "Yêu cầu chuyển kho", "en": "Transfer request", "ko": "창고 이동 요청" },
              "icon": "req",
              "systems": [
                "WMS"
              ],
              "bullets": [
                { "vi": "Chọn loại chuyển giữa hai kho (WH → WH)", "en": "Select transfer type between warehouses (WH → WH)", "ko": "창고 간 이동 유형 선택 (WH → WH)" },
                { "vi": "Nhập kho nguồn – đích, lý do chuyển, người phụ trách", "en": "Enter source – destination, reason, person in charge", "ko": "출발·도착 창고, 사유, 담당자 입력" },
                { "vi": "Mặt hàng và số lượng yêu cầu", "en": "Items and requested quantities", "ko": "품목 및 요청 수량" }
              ]
            },
            {
              "title": { "vi": "In QR yêu cầu", "en": "Print request QR", "ko": "요청 QR 인쇄" },
              "icon": "print",
              "systems": [
                "WMS"
              ],
              "bullets": [
                { "vi": "In mã QR của yêu cầu chuyển kho", "en": "Print the transfer request QR code", "ko": "창고 이동 요청 QR 코드 인쇄" }
              ]
            },
            {
              "title": { "vi": "Phiếu chuyển kho", "en": "Transfer note", "ko": "창고 이동전표" },
              "icon": "pda",
              "systems": [
                "PDA",
                "WMS"
              ],
              "bullets": [
                { "vi": "Lập phiếu chuyển kho từ yêu cầu: quét tem QR / mã vạch từng pallet, thùng hàng thực tế để gán đúng hàng vào từng dòng phiếu, rồi kiểm tra lại vị trí đích và số lượng chuyển", "en": "Create the transfer note from the request: scan the QR label / barcode of each actual pallet and box to assign the right goods to each note line, then re-check the destination location and transfer quantity", "ko": "요청으로 창고 이동전표 생성: 실제 팔레트·박스의 QR 라벨/바코드를 스캔해 전표 라인별로 정확한 물품을 지정한 뒤, 도착 로케이션과 이동 수량을 다시 확인" }
              ]
            },
            {
              "title": { "vi": "Duyệt phiếu", "en": "Approve note", "ko": "전표 승인" },
              "icon": "check",
              "systems": [
                "WMS",
                "SAP"
              ],
              "bullets": [
                { "vi": "Duyệt phiếu chuyển kho", "en": "Approve the transfer note", "ko": "창고 이동전표 승인" },
                { "vi": "WMS giảm tồn kho tại nguồn và tăng tồn kho tại đích", "en": "WMS decreases stock at source and increases it at destination", "ko": "WMS 출발지 재고 감소, 도착지 재고 증가" },
                {
                  "sync": { "vi": "Đồng bộ kết quả sang SAP", "en": "Results synced to SAP", "ko": "결과 SAP 연동" }
                }
              ]
            }
          ]
        },
        {
          "label": { "vi": "B. Chuyển vị trí trong cùng kho", "en": "B. Location move within a warehouse", "ko": "B. 동일 창고 내 로케이션 이동" },
          "steps": [
            {
              "title": { "vi": "Quét vị trí nguồn", "en": "Scan source location", "ko": "출발 로케이션 스캔" },
              "icon": "loc",
              "systems": [
                "PDA"
              ],
              "bullets": [
                { "vi": "Trên app WMS (thiết bị cầm tay), chọn chức năng chuyển vị trí", "en": "On the WMS app (handheld), open the location move function", "ko": "WMS 앱(휴대 단말기)에서 로케이션 이동 기능 선택" },
                { "vi": "Quét mã vị trí nguồn", "en": "Scan the source location code", "ko": "출발 로케이션 코드 스캔" }
              ]
            },
            {
              "title": { "vi": "Quét tem hàng", "en": "Scan goods label", "ko": "물품 라벨 스캔" },
              "icon": "pda",
              "systems": [
                "PDA"
              ],
              "bullets": [
                { "vi": "Quét tem QR của pallet cần chuyển để xác định món hàng", "en": "Scan the QR label of the pallet to identify the goods", "ko": "이동할 팔레트 QR 라벨 스캔으로 물품 확인" }
              ]
            },
            {
              "title": { "vi": "Quét vị trí đích", "en": "Scan destination location", "ko": "도착 로케이션 스캔" },
              "icon": "loc",
              "systems": [
                "PDA"
              ],
              "bullets": [
                { "vi": "Quét mã vị trí đích", "en": "Scan the destination location code", "ko": "도착 로케이션 코드 스캔" }
              ]
            },
            {
              "title": { "vi": "Tự lập phiếu", "en": "Note auto-created", "ko": "전표 자동 생성" },
              "icon": "list",
              "systems": [
                "WMS"
              ],
              "bullets": [
                { "vi": "Hệ thống tự động lập phiếu chuyển vị trí trên WMS", "en": "The system auto-creates the location move note in WMS", "ko": "시스템이 WMS에 로케이션 이동전표 자동 생성" }
              ]
            },
            {
              "title": { "vi": "Duyệt phiếu", "en": "Approve note", "ko": "전표 승인" },
              "icon": "check",
              "systems": [
                "WMS"
              ],
              "bullets": [
                { "vi": "Duyệt phiếu chuyển vị trí trên WMS Web", "en": "Approve the move note on WMS Web", "ko": "WMS 웹에서 로케이션 이동전표 승인" },
                { "vi": "WMS chuyển tồn kho từ vị trí nguồn sang vị trí đích", "en": "WMS moves stock from the source to the destination location", "ko": "WMS가 출발 → 도착 로케이션으로 재고 이동" }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "p8",
      "number": "8",
      "color": "slate",
      "title": { "vi": "Quy trình kiểm kê", "en": "Stocktaking process", "ko": "재고실사 프로세스" },
      "subtitle": { "vi": "Hằng tháng, bằng PDA", "en": "Monthly, with PDA", "ko": "월간, PDA 사용" },
      "layout": "stack",
      "groups": [
        {
          "steps": [
            {
              "title": { "vi": "Chốt số tồn", "en": "Freeze stock", "ko": "재고 마감" },
              "icon": "plan",
              "systems": [
                "WMS"
              ],
              "bullets": [
                { "vi": "Chọn tháng kiểm kê và chốt số tồn", "en": "Select the stocktaking month and freeze the book stock", "ko": "실사 월 선택 및 장부 재고 확정" }
              ]
            },
            {
              "title": { "vi": "Quét tem kiểm kê", "en": "Scan count labels", "ko": "실사 라벨 스캔" },
              "icon": "pda",
              "systems": [
                "PDA"
              ],
              "bullets": [
                { "vi": "Thực hiện quét tem mặt hàng kiểm kê", "en": "Scan labels of counted items", "ko": "실사 품목 라벨 스캔" }
              ]
            },
            {
              "title": { "vi": "Tổng hợp kết quả", "en": "Summarize results", "ko": "결과 집계" },
              "icon": "list",
              "systems": [
                "WMS"
              ],
              "bullets": [
                { "vi": "Tổng hợp kết quả kiểm kê", "en": "Summarize stocktaking results", "ko": "재고실사 결과 집계" }
              ]
            },
            {
              "title": { "vi": "Duyệt điều chỉnh", "en": "Approve adjustments", "ko": "조정 승인" },
              "icon": "check",
              "systems": [
                "WMS",
                "SAP"
              ],
              "bullets": [
                { "vi": "Duyệt điều chỉnh tồn kho", "en": "Approve stock adjustments", "ko": "재고 조정 승인" },
                { "vi": "Tạo phiếu nhập / xuất kho điều chỉnh tự động", "en": "Adjustment receipt / issue notes created automatically", "ko": "조정 입고·출고 전표 자동 생성" },
                {
                  "sync": { "vi": "Đồng bộ kết quả sang SAP", "en": "Results synced to SAP", "ko": "결과 SAP 연동" }
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "panels": {
    "integration": {
      "title": { "vi": "Tích hợp hệ thống", "en": "System integration", "ko": "시스템 연동" },
      "systems": [
        {
          "key": "SAP",
          "icon": "db",
          "name": "SAP",
          "text": { "vi": "Đồng bộ sang WMS các yêu cầu xuất nhập hàng", "en": "Syncs receipt/issue requests to WMS", "ko": "입출고 요청을 WMS로 연동" }
        },
        {
          "key": "WMS",
          "icon": "wh",
          "name": "WMS",
          "text": { "vi": "Đồng bộ sang SAP phiếu nhập xuất kho (kết quả) đã duyệt", "en": "Syncs approved receipt/issue notes (results) to SAP", "ko": "승인된 입출고 전표(결과)를 SAP로 연동" }
        },
        {
          "key": "PDA",
          "icon": "pda",
          "name": { "vi": "PDA / App", "en": "PDA / App", "ko": "PDA / 앱" },
          "text": { "vi": "Quét tem nhập, xuất, trả hàng tại kho", "en": "Scan labels to receive, issue, return in the warehouse", "ko": "창고에서 라벨 스캔으로 입고·출고·반품" }
        }
      ],
      "links": [
        {
          "top": { "vi": "Yêu cầu xuất nhập hàng →", "en": "Receipt/issue requests →", "ko": "입출고 요청 →" },
          "bottom": { "vi": "← Phiếu nhập xuất kho đã duyệt", "en": "← Approved receipt/issue notes", "ko": "← 승인된 입출고 전표" }
        },
        {
          "top": { "vi": "Lệnh xuất / nhập", "en": "Issue / receipt orders", "ko": "출고 / 입고 지시" },
          "bottom": { "vi": "Kết quả quét", "en": "Scan results", "ko": "스캔 결과" }
        }
      ]
    },
    "notes": {
      "title": { "vi": "Lưu ý chính", "en": "Key notes", "ko": "주요 사항" },
      "items": [
        { "vi": "Kế hoạch mua, yêu cầu mua và yêu cầu trả hàng NCC không cần phê duyệt.", "en": "Purchase plans, purchase requests and supplier return requests need no approval.", "ko": "구매 계획, 구매 요청, 공급업체 반품 요청은 승인이 필요 없음." },
        { "vi": "Mọi phiếu nhập / xuất do hệ thống tự sinh sau khi quét PDA, VP Kho duyệt trên WMS rồi mới đồng bộ SAP.", "en": "All receipt / issue notes are auto-created after PDA scans; the warehouse office approves in WMS before syncing to SAP.", "ko": "모든 입고·출고 전표는 PDA 스캔 후 자동 생성되며, 창고 사무실이 WMS에서 승인한 후 SAP로 연동됨." },
        { "vi": "1 pallet chỉ 1 loại hàng; tem định danh số lượng, xuất lẻ thì trừ dần trên tem.", "en": "1 pallet holds 1 item; labels carry quantity, partial issues are deducted on the label.", "ko": "팔레트 1개 = 품목 1종, 라벨에 수량 표시, 부분 출고 시 라벨에서 차감." },
        { "vi": "Hàng NG để ở khu vực NG chờ xuất trả; tách pallet NG thì phải tách tem.", "en": "NG goods stay in the NG area until returned; splitting an NG pallet requires splitting its label.", "ko": "NG품은 반품 전까지 NG 구역에 보관, NG 팔레트 분할 시 라벨도 분할." },
        { "vi": "Vật tư tiêu hao không theo dõi trên SAP.", "en": "Consumables are not tracked in SAP.", "ko": "소모품은 SAP에서 관리하지 않음." },
        { "vi": "Chuyển vị trí trong kho chỉ quản lý trên WMS, không đồng bộ SAP.", "en": "Location moves within a warehouse are managed in WMS only and not synced to SAP.", "ko": "창고 내 로케이션 이동은 WMS에서만 관리하며 SAP와 연동하지 않음." }
      ]
    },
    "legend": {
      "title": { "vi": "Chú thích", "en": "Legend", "ko": "범례" },
      "flows": [
        {
          "color": "blue",
          "dashed": false,
          "text": { "vi": "Luồng mua / nhập", "en": "Purchasing / receiving flow", "ko": "구매 / 입고 흐름" }
        },
        {
          "color": "green",
          "dashed": false,
          "text": { "vi": "Luồng xuất dùng", "en": "Production issue flow", "ko": "생산 출고 흐름" }
        },
        {
          "color": "orange",
          "dashed": false,
          "text": { "vi": "Luồng gia công", "en": "Outsourcing flow", "ko": "외주가공 흐름" }
        },
        {
          "color": "red",
          "dashed": true,
          "text": { "vi": "Hàng NG / trả lại", "en": "NG goods / returns", "ko": "NG품 / 반품" }
        },
        {
          "sync": true,
          "text": { "vi": "Đồng bộ hệ thống", "en": "System sync", "ko": "시스템 연동" }
        }
      ],
      "swatches": [
        {
          "color": "blue",
          "text": { "vi": "Quy trình mua", "en": "Purchasing process", "ko": "구매 프로세스" }
        },
        {
          "color": "green",
          "text": { "vi": "Nhập xuất dùng", "en": "Production issue & return", "ko": "생산 출고·반납" }
        },
        {
          "color": "orange",
          "text": { "vi": "Gia công", "en": "Outsourcing", "ko": "외주가공" }
        }
      ],
      "systemsNote": { "vi": "Nơi thực hiện bước", "en": "Where the step is done", "ko": "단계 수행 위치" },
      "manualLabel": { "vi": "Thủ công", "en": "Manual", "ko": "수작업" }
    }
  }
});
