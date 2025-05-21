
# Pasak-LSTM: Multi-step Inflow Forecasting using LSTM and Flask API

โครงการนี้ใช้โมเดล LSTM (Long Short-Term Memory) สำหรับพยากรณ์ปริมาณน้ำไหลเข้าเขื่อนป่าสัก โดยสามารถพยากรณ์ล่วงหน้าได้หลายวัน และให้บริการผ่าน Flask API ที่สามารถรับไฟล์ข้อมูล `.csv`, ดำเนินการเทรนโมเดล, และส่งค่าพยากรณ์กลับในรูปแบบ JSON

---

## 🧠 Features

- โมเดล LSTM สำหรับพยากรณ์ inflow (`Inflow, cms`) ล่วงหน้าแบบหลายวัน
- รองรับการเลือกจำนวนวันที่ต้องการพยากรณ์ (`forecastDays`)
- ผู้ใช้สามารถระบุฟีเจอร์ที่ใช้เทรนได้เอง (`featureColumns`)
- รองรับการกำหนดจำนวน epoch แยกตามวัน (`epochsPerDay`)
- มีการคำนวณ metric ประเมินผล เช่น **RMSE**, **NSE**, และ **Correlation (r)**
- Visualization: มีการ plot RMSE ต่อ epoch และกราฟเปรียบเทียบค่าจริงกับค่าพยากรณ์
- ให้บริการผ่าน Flask API ที่รองรับ CORS (พร้อมใช้งานกับ Front-end)

---

## 📂 โครงสร้างโปรเจกต์

```
Pasak-LSTM/
├── Pasak_Tensorflow_LSTM.py    # Main Flask backend พร้อม LSTM logic
├── uploads/                    # เก็บไฟล์ CSV ที่อัปโหลด
├── results/                    # เก็บผลลัพธ์การเทรนและพยากรณ์
└── README.md                   # ไฟล์ README นี้
```

---

## 📊 ตัวอย่างฟีเจอร์ในชุดข้อมูล

ชุดข้อมูลที่ใช้ควรประกอบด้วยฟีเจอร์อย่างน้อยเหล่านี้:

- `date`: วันที่ (จะถูกแปลงเป็น datetime)
- `Rainfall, mm.`: ปริมาณฝน
- `S.3`, `S.4B`, `S.42`, `S.14`: ปริมาณน้ำจากสถานีต่างๆ
- `Inflow, cms`: ปริมาณน้ำไหลเข้า (เป้าหมาย)

---

## 🚀 การใช้งาน API

### 📥 Endpoint: `/upload` (POST)

**Description**: อัปโหลดไฟล์ CSV และสั่งให้เทรนและพยากรณ์ข้อมูล

#### 🧾 Form Data:

| Field | Type | Description |
|-------|------|-------------|
| `file` | File (.csv) | ไฟล์ข้อมูลที่ใช้เทรนและทดสอบ |
| `forecastDays` | int | จำนวนวันที่ต้องการพยากรณ์ |
| `featureColumns` | JSON array | รายการฟีเจอร์ เช่น `["Rainfall, mm.", "S.3", "S.4B", "S.42", "S.14"]` |
| `epochsPerDay` | JSON object | จำนวน epochs ต่อวัน เช่น `{ "1": 100, "2": 120, "3": 150 }` |

#### 📤 Response:

```json
{
  "all_results": {...},            // ค่าประเมินผล (r, RMSE, NSE)
  "train_results": { "1": [...] }, // ค่าจริงและค่าพยากรณ์ใน train set
  "test_results": { "1": [...] }   // ค่าจริงและค่าพยากรณ์ใน test set
}
```

---

### 📤 Endpoint: `/api/results` (GET)

**Description**: เรียกดูผลลัพธ์การเทรนล่าสุด

---

## 🛠️ วิธีรันโปรเจกต์

1. ติดตั้ง Python dependencies:
```bash
pip install flask flask-cors tensorflow pandas scikit-learn matplotlib
```

2. รัน Flask API:
```bash
python Pasak_Tensorflow_LSTM.py
```

3. เรียกใช้งาน API ด้วย Postman หรือ Front-end

---

## 📈 Metrics ที่ใช้ประเมิน

- **RMSE (Root Mean Squared Error)**: วัดค่าคลาดเคลื่อนโดยรวม
- **NSE (Nash–Sutcliffe Efficiency)**: ประเมินความแม่นยำของโมเดลเทียบกับค่าเฉลี่ย
- **Correlation Coefficient (r)**: ความสัมพันธ์เชิงเส้นระหว่างค่าจริงและค่าพยากรณ์

---

## 🖼️ Visualization

- กราฟ RMSE ต่อ Epoch สำหรับ Train/Test
- กราฟเปรียบเทียบค่าจริง vs ค่าพยากรณ์ในแต่ละวัน

---

## 📌 หมายเหตุ

- ข้อมูลควรถูกจัดเรียงตามวันอย่างถูกต้องก่อนนำเข้า
- ฟีเจอร์ทั้งหมดจะถูกสเกลให้อยู่ในช่วง [0.05, 0.95]
- การทำนายแบบ multi-step ใช้วิธี recursive prediction

---

## 📬 ติดต่อ

พัฒนาโดย: [Rossukond](https://github.com/Rossukond)

---

## 📄 License

This project is licensed under the MIT License.
