# Dart

---
## 概要
DartはGoogleが開発したクライアントサイド向けのオブジェクト指向プログラミング言語である。主な用途はWeb、モバイル、デスクトップアプリケーションの開発であり、特にFlutterフレームワークの主要言語として広く利用されている。Dartはシンプルな構文と高いパフォーマンス、クロスプラットフォーム対応を特徴とする。

```mermaid
%% Dartの主な用途（詳細）
graph TD
    Dart -->|主要言語| Flutter
    Dart --> Web
    Dart --> モバイル
    Dart --> デスクトップ
    Flutter -->|iOS/Android| モバイル
    Flutter --> Web
    Flutter --> デスクトップ
    Web -->|Dart2js| JavaScript
    デスクトップ -->|Windows| WinApp
    デスクトップ -->|macOS| MacApp
    デスクトップ -->|Linux| LinuxApp
```

---
## 歴史と特徴
Dartは2011年にGoogleによって発表された。当初はJavaScriptの代替を目指していたが、現在はFlutterの普及によりモバイル開発言語としての地位を確立している。特徴として、静的型付けと動的型付けの両方をサポートし、JIT（Just-In-Time）およびAOT（Ahead-Of-Time）コンパイル、ガベージコレクション、Null安全、豊富な標準ライブラリを備えている。

```mermaid
%% Dartの特徴と進化
graph LR
    A[Dart] --> B[静的型付け]
    A --> C[動的型付け]
    A --> D[JIT/AOTコンパイル]
    D --> D1[JIT: 開発時高速]
    D --> D2[AOT: 本番高速]
    A --> E[Null安全]
    E --> E1[Null許容型]
    E --> E2[Nullチェック]
    A --> F[ガベージコレクション]
    A --> G[クロスプラットフォーム]
    G --> G1[Web]
    G --> G2[モバイル]
    G --> G3[デスクトップ]
    A --> H[豊富な標準ライブラリ]
```

---
## インストール方法
Dart SDKは公式サイト（https://dart.dev/get-dart）からダウンロードできる。インストールはOSごとに異なるが、一般的な手順は以下の通りである。

1. インストーラまたはパッケージマネージャでSDKをインストール
2. 環境変数PATHにDart SDKのパスを追加
3. コマンドラインで`dart --version`を実行し、バージョンが表示されることを確認

```mermaid
%% インストール手順フロー（詳細）
flowchart TD
    A[公式サイトへアクセス] --> B[SDKダウンロード]
    B --> C[インストーラ実行]
    C --> D[PATH設定]
    D --> E[コマンドラインでdart --version]
    E --> F{バージョン表示?}
    F -- Yes --> G[インストール完了]
    F -- No --> H[PATHやインストールを再確認]
```

---
## 環境構築
Dart SDKのインストール後、エディタとしてVisual Studio CodeやIntelliJ IDEA、Android Studioなどを利用すると効率的である。VS Codeの場合、DartおよびFlutter拡張機能をインストールすることで、補完やデバッグ、フォーマットなどの機能が利用できる。

```mermaid
%% 推奨開発環境（詳細）
graph LR
    A[Dart SDK] --> B[VS Code]
    A --> C[IntelliJ IDEA]
    A --> D[Android Studio]
    B --> E[Dart拡張]
    B --> F[Flutter拡張]
    C --> G[Dartプラグイン]
    D --> H[Flutterプラグイン]
    B --> I[デバッグ]
    C --> I
    D --> I
```

---
## プロジェクトの作成
新規プロジェクトは以下のコマンドで作成する。

```sh
dart create my_app
```
`dart create`コマンドは、CLIアプリやWebアプリ、パッケージなど複数のテンプレートをサポートしている。テンプレートを指定する場合は`-t`オプションを利用する。

```mermaid
%% プロジェクト作成コマンドの流れ（詳細）
sequenceDiagram
    participant U as ユーザー
    participant C as コマンドライン
    U->>C: dart create my_app
    C-->>U: my_app ディレクトリ生成
    U->>C: cd my_app
    U->>C: dart run
    C-->>U: アプリ実行
```

---
## ディレクトリ構成
標準的なDartプロジェクトのディレクトリ構成は以下の通りである。

```mermaid
%% ディレクトリ構成（詳細）
graph TD
    A[my_app] --> B[bin/]
    B --> B1[main.dart]
    A --> C[lib/]
    C --> C1[src/]
    C --> C2[utils.dart]
    A --> D[test/]
    D --> D1[main_test.dart]
    A --> E[pubspec.yaml]
    A --> F[README.md]
    A --> G[.gitignore]
```
- `bin/`: エントリポイントとなる実行ファイルを配置
- `lib/`: ライブラリや主要なコードを配置
- `test/`: テストコードを配置
- `pubspec.yaml`: パッケージ管理やメタ情報を記述

---
## 基本構文
Dartの基本的な構文はC系言語に近い。main関数がエントリポイントとなる。

```dart
void main() {
  print('Hello, Dart!');
}
```
- セミコロンで文を区切る
- コメントは`//`または`/* ... */`で記述

---
## データ型
Dartは静的型付け言語であり、主なデータ型は以下の通りである。
- `int`: 整数
- `double`: 浮動小数点数
- `String`: 文字列
- `bool`: 真偽値
- `List`: 配列
- `Set`: 集合
- `Map`: 連想配列
- `dynamic`: 任意の型

```dart
int a = 10;
double b = 3.14;
String s = 'hello';
bool flag = true;
```

```mermaid
%% データ型の分類（詳細）
graph TD
    A[データ型] --> B[数値型]
    B --> B1[int]
    B --> B2[double]
    A --> C[文字列型]
    C --> C1[String]
    A --> D[真偽値型]
    D --> D1[bool]
    A --> E[コレクション型]
    E --> E1[List]
    E --> E2[Set]
    E --> E3[Map]
    A --> F[特殊型]
    F --> F1[dynamic]
    F --> F2[Object]
    F --> F3[Null]
```

---
## 変数と定数
変数は`var`または型指定で宣言できる。定数は`final`または`const`で宣言する。

```dart
var name = 'Taro'; // 型推論
String city = 'Tokyo'; // 明示的な型指定
final age = 20; // 実行時定数
const pi = 3.14; // コンパイル時定数
```
- `final`は一度だけ代入可能
- `const`はコンパイル時に値が決定

---
## 演算子
Dartは算術演算子、比較演算子、論理演算子、ビット演算子、型判定演算子などをサポートする。

```dart
int a = 10, b = 3;
print(a + b); // 13
print(a / b); // 3.333...
print(a == b); // false
print(a is int); // true
```

```mermaid
%% 演算子の種類（詳細）
graph LR
    A[演算子] --> B["算術: +, -, *, /, %, ~/"]
    A --> C["比較: ==, !=, >, <, >=, <="]
    A --> D["論理: &&, ||, !"]
    A --> E["ビット: &, |, ^, ~, <<, >>"]
    A --> F["型判定: is, as"]
    A --> G["代入: =, ??=, +=, -="]
```

---
## 制御構文
if文、for文、while文、do-while文、switch文が利用できる。

```dart
if (a > b) {
  print('aはbより大きい');
} else {
  print('aはb以下');
}

for (int i = 0; i < 5; i++) {
  print(i);
}
```

```mermaid
%% 制御構文のフロー例（詳細）
flowchart TD
    Start[開始] --> If[if文]
    If -->|true| For[for文]
    If -->|false| Switch[switch文]
    For --> While[while文]
    While --> End[終了]
    Switch --> End
```

---
## コレクション（List, Set, Map）
リスト、セット、マップは以下のように扱う。

```dart
List<int> numbers = [1, 2, 3];
Set<String> fruits = {'apple', 'banana'};
Map<String, int> scores = {'math': 90, 'english': 80};
```
- Listは順序あり、重複可
- Setは順序なし、重複不可
- Mapはキーと値のペア

```mermaid
%% コレクションの関係（詳細）
graph LR
    A[コレクション] --> B[List]
    B --> B1[順序あり]
    B --> B2[重複可]
    A --> C[Set]
    C --> C1[順序なし]
    C --> C2[重複不可]
    A --> D[Map]
    D --> D1[キー]
    D --> D2[値]
```

---
## イテレーション
for-in文やforEach、map、whereなどの高階関数でコレクションを反復できる。

```dart
for (var n in numbers) {
  print(n);
}

numbers.forEach((n) => print(n));
```

```mermaid
%% イテレーションの流れ
flowchart TD
    Start[コレクション] --> For[for-in]
    Start --> ForEach[forEach]
    For --> End[要素処理]
    ForEach --> End
```

---
## Null安全
DartはNull安全をサポートしており、Nullable型は`?`で表現する。NullチェックやNull合体演算子`??`、Null安全呼び出し`?.`が利用できる。

```dart
String? name;
name = null; // 許容される
print(name ?? 'No Name');
```

```mermaid
%% Null安全の型関係（詳細）
graph TD
    A[String] -->|Nullable| B[String?]
    B -->|null許容| C[null]
    A -->|Non-nullable| D[値あり]
```

---
## 関数
関数は通常の形式、無名関数、ファットアロー（`=>`）形式で定義できる。デフォルト引数や名前付き引数もサポートする。

```dart
int add(int a, int b) {
  return a + b;
}

int sub(int a, {int b = 1}) => a - b;
```

```mermaid
%% 関数の種類
graph TD
    A[関数] --> B[通常関数]
    A --> C[無名関数]
    A --> D[ラムダ式]
    A --> E[名前付き引数]
    A --> F[デフォルト引数]
```

---
## ラムダ式
ラムダ式（無名関数）は関数型プログラミングで多用される。

```dart
var multiply = (int x, int y) => x * y;
```

---
## クラスとオブジェクト
Dartはクラスベースのオブジェクト指向言語であり、カプセル化、継承、ポリモーフィズムをサポートする。

```dart
class Person {
  String name;
  int age;
  Person(this.name, this.age);

  void greet() {
    print('こんにちは、$nameです。');
  }
}
```

```mermaid
%% クラスとオブジェクトの関係（詳細）
classDiagram
    class Person {
      String name
      int age
      greet()
    }
    class Student
    class Teacher
    Person <|-- Student
    Person <|-- Teacher
    Student : int studentId
    Teacher : int teacherId
```

---
## コンストラクタ
コンストラクタは複数定義できる。名前付きコンストラクタや初期化リストも利用可能。

```dart
class Point {
  int x, y;
  Point(this.x, this.y);
  Point.origin() : x = 0, y = 0;
}
```

```mermaid
%% コンストラクタの種類
classDiagram
    class Point {
      +int x
      +int y
      +Point(x, y)
      +Point.origin()
    }
```

---
## ゲッターとセッター
プロパティのカプセル化や計算プロパティに利用する。

```dart
class Circle {
  double radius;
  Circle(this.radius);
  double get area => 3.14 * radius * radius;
  set diameter(double d) => radius = d / 2;
}
```

```mermaid
%% ゲッターとセッターの関係
classDiagram
    class Circle {
      +double radius
      +double area
      +set diameter(double d)
    }
```

---
## 静的メンバー
`static`キーワードでクラス全体で共有されるメンバーを定義できる。

```dart
class MathUtil {
  static double pi = 3.14;
  static double square(double x) => x * x;
}
```

```mermaid
%% 静的メンバーの利用
classDiagram
    class MathUtil {
      <<static>>
      +double pi
      +double square(double x)
    }
```

---
## 継承とミックスイン
Dartは単一継承とミックスイン（`with`）をサポートする。ミックスインは複数のクラスの機能を合成できる。

```dart
class Animal {
  void eat() => print('eat');
}
class Dog extends Animal {}
mixin Swimmer {
  void swim() => print('swimming');
}
class Fish extends Animal with Swimmer {}
```

```mermaid
%% 継承とミックスインの関係（詳細）
classDiagram
    class Animal
    class Dog
    class Swimmer
    class Fish
    Animal <|-- Dog
    Animal <|-- Fish
    Fish ..|> Swimmer : with
    Swimmer : swim()
    Dog : bark()
    Fish : swim()
```

---
## 抽象クラスとインターフェース
抽象クラスは`abstract`で定義し、インターフェースとしても利用できる。Dartではすべてのクラスがインターフェースとして機能する。

```dart
abstract class Shape {
  double area();
}
class Circle extends Shape {
  double radius;
  Circle(this.radius);
  @override
  double area() => 3.14 * radius * radius;
}
```

```mermaid
%% 抽象クラスの実装関係（詳細）
classDiagram
    class Shape {
      <<abstract>>
      area()
    }
    class Circle
    class Square
    Shape <|-- Circle
    Shape <|-- Square
    Circle : double radius
    Square : double side
```

---
## ジェネリクス
ジェネリクスにより型安全なコレクションやクラスを作成できる。

```dart
List<String> names = <String>[];
class Box<T> {
  T value;
  Box(this.value);
}
```

```mermaid
%% ジェネリクスのイメージ（詳細）
classDiagram
    class Box~T~ {
      T value
    }
    class StringBox {
      String value
    }
    class IntBox {
      int value
    }
    Box~T~ <|-- StringBox
    Box~T~ <|-- IntBox
```

---
## 拡張メソッド
既存の型にメソッドを追加できる。

```dart
extension NumberParsing on String {
  int toInt() => int.parse(this);
}
print('123'.toInt());
```

```mermaid
%% 拡張メソッドのイメージ
classDiagram
    class String
    class NumberParsing
    String <.. NumberParsing : extension
    NumberParsing : toInt()
```

---
## 非同期処理
非同期処理は`Future`と`async`/`await`で記述する。非同期関数は`Future`型を返す。

```dart
Future<void> fetchData() async {
  await Future.delayed(Duration(seconds: 1));
  print('完了');
}
```

```mermaid
%% 非同期処理の流れ（詳細）
sequenceDiagram
    participant M as main
    participant F as fetchData
    M->>F: fetchData()呼び出し
    F-->>M: Future返却
    M->>F: await
    F-->>M: 結果
```

---
## ストリーム
ストリームは複数の非同期イベントを扱う。`await for`でストリームを消費できる。

```dart
Stream<int> countStream() async* {
  for (int i = 0; i < 3; i++) {
    yield i;
  }
}

void main() async {
  await for (var value in countStream()) {
    print(value);
  }
}
```

```mermaid
%% ストリームの流れ（詳細）
sequenceDiagram
    participant S as Stream
    participant L as Listener
    S-->>L: データ1
    S-->>L: データ2
    S-->>L: データ3
    L-->>S: listen()
```

---
## Future
Futureは1回限りの非同期処理を表す。`then`や`catchError`でコールバックを登録できる。

```dart
Future<String> fetchUser() async {
  return 'user';
}
fetchUser().then((user) => print(user));
```

```mermaid
%% Futureの利用イメージ
sequenceDiagram
    participant U as ユーザー
    participant F as Future
    U->>F: then()
    F-->>U: 結果
    F-->>U: catchError()
```

---
## 例外処理
例外は`try-catch`で処理し、`finally`で後処理を記述できる。

```dart
try {
  int x = int.parse('abc');
} catch (e) {
  print('エラー: $e');
} finally {
  print('終了');
}
```

```mermaid
%% 例外処理のフロー（詳細）
flowchart TD
    Try[try] -->|例外発生| Catch[catch]
    Try -->|正常終了| End[終了]
    Catch --> Finally[finally]
    End --> Finally
    Catch --> ErrorLog[ログ出力]
```

---
## パッケージ管理
Dartのパッケージ管理は`pub`で行う。依存関係やバージョン管理は`pubspec.yaml`で記述する。

```yaml
name: my_app
description: サンプルアプリ
dependencies:
  http: ^0.14.0
dev_dependencies:
  test: ^1.16.0
```

```mermaid
%% パッケージ管理の流れ
flowchart TD
    A[pubspec.yaml編集] --> B[dart pub get]
    B --> C[依存パッケージ取得]
    C --> D[プロジェクトで利用可能]
```

---
## 外部パッケージの利用
外部パッケージは`pubspec.yaml`に記載し、`dart pub get`で取得する。インポートして利用する。

```dart
import 'package:http/http.dart' as http;
```

```mermaid
%% 外部パッケージ利用の流れ
flowchart TD
    A[pubspec.yamlに記載] --> B[dart pub get]
    B --> C[importで利用]
    C --> D[コードで呼び出し]
```

---
## よく使うコマンド
- プロジェクト作成: `dart create`
- 実行: `dart run`
- テスト: `dart test`
- パッケージ取得: `dart pub get`
- 静的解析: `dart analyze`
- フォーマット: `dart format .`

```mermaid
%% コマンドの利用フロー
flowchart TD
    A[dart create] --> B[プロジェクト作成]
    B --> C[dart pub get]
    C --> D[依存取得]
    D --> E[dart run]
    E --> F[実行]
    D --> G[dart test]
    G --> H[テスト実行]
```

---
## テスト
Dartでは`test`パッケージを利用して単体テストやグループテストを記述できる。

```dart
import 'package:test/test.dart';

void main() {
  group('加算テスト', () {
    test('1 + 1 = 2', () {
      expect(1 + 1, 2);
    });
    test('2 + 2 = 4', () {
      expect(2 + 2, 4);
    });
  });
}
```

```mermaid
%% テストの流れ（詳細）
sequenceDiagram
    participant U as ユーザー
    participant T as テストフレームワーク
    participant C as コード
    U->>T: テスト実行
    T->>C: テストケース呼び出し
    C-->>T: 結果返却
    T-->>U: 結果出力
```

---
## モックとスタブ
テストで依存オブジェクトを置き換えるためにモックやスタブを利用する。`mockito`パッケージなどが代表的である。

```dart
import 'package:mockito/mockito.dart';

class MockClient extends Mock implements http.Client {}
```

```mermaid
%% モック・スタブの利用関係
classDiagram
    class Service
    class MockService
    class Test
    Service <|-- MockService
    Test --> MockService : 利用
```

---
## 開発ツール
主な開発ツールは以下の通りである。
- Dart DevTools: プロファイリングやデバッグ、メモリ解析
- VS Code拡張: コード補完、デバッグ、フォーマット
- IntelliJ/Android Studio: 高機能IDE

```mermaid
%% 開発ツールの関係
graph TD
    A[開発者] --> B[VS Code]
    A --> C[IntelliJ]
    A --> D[Android Studio]
    B --> E[Dart拡張]
    B --> F[Flutter拡張]
    B --> G[Dart DevTools]
    C --> G
    D --> G
```

---
## デバッグ
Dart DevToolsやIDEのデバッガを利用してブレークポイント設定、ステップ実行、変数ウォッチなどが可能である。

```mermaid
%% デバッグの流れ
sequenceDiagram
    participant Dev as 開発者
    participant IDE as IDE
    participant App as アプリ
    Dev->>IDE: ブレークポイント設定
    IDE->>App: 実行
    App-->>IDE: 停止
    IDE-->>Dev: 変数ウォッチ・ステップ実行
```

---
## コーディング規約
公式の`dartfmt`や`dart analyze`でコードスタイルや静的解析を行う。命名規則やインデント、コメントの書き方なども推奨されている。

```mermaid
%% コーディング規約の適用
flowchart TD
    A[コード記述] --> B[dart format]
    B --> C[整形]
    C --> D[dart analyze]
    D --> E[静的解析]
    E --> F[警告・エラー表示]
```

---
## ドキュメンテーション
Dartでは`///`でドキュメントコメントを記述し、`dart doc`でAPIドキュメントを生成できる。Markdown記法も利用可能である。

```dart
/// これはサンプル関数である
int add(int a, int b) => a + b;
```

```mermaid
%% ドキュメント生成の流れ
flowchart TD
    A["///コメント記述"] --> B["dart doc"]
    B --> C["APIドキュメント生成"]
    C --> D["HTML出力"]
```

---
## よくあるエラーと対処法
- Null参照エラー：Null安全を活用し、Nullable型を適切に扱うこと。
- 型エラー：型推論や明示的な型指定を活用すること。
- パッケージの依存関係エラー：`dart pub get`や`pubspec.yaml`の記述を見直すこと。
- 実行時エラー：例外処理やデバッグツールを活用すること。

```mermaid
%% エラーと対処法のフロー
flowchart TD
    A[エラー発生] --> B[エラーメッセージ確認]
    B --> C[原因特定]
    C --> D[対処法調査]
    D --> E[修正]
    E --> F[再実行]
    F -->|解決| G[完了]
    F -->|未解決| B
```

---
## ベストプラクティス
- 型安全を意識し、Nullable型や型推論を適切に使うこと
- コードの再利用性を高めるために関数やクラスを小さく保つこと
- パッケージ分割やレイヤー設計を意識すること
- テストコードを充実させること
- コーディング規約や静的解析を活用すること

```mermaid
%% ベストプラクティスの関係
graph TD
    A[型安全] --> B[Nullable型の活用]
    A --> C[型推論]
    D[再利用性] --> E[小さな関数・クラス]
    D --> F[パッケージ分割]
    G[テスト] --> H[単体テスト]
    G --> I[モック・スタブ]
    J[規約] --> K[静的解析]
    J --> L[フォーマット]
```

---
## 参考リンク
- [Dart公式サイト](https://dart.dev/)
- [Dart言語ツアー](https://dart.dev/guides/language/language-tour)
- [Flutter公式サイト](https://flutter.dev/)
- [DartPad（オンライン実行環境）](https://dartpad.dev/)
---